import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const output = 'outputs/phase-1';
mkdirSync(output, { recursive: true });

test('static entry redirects even without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/ar\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await context.close();
});

test('sitemap and robots describe only published routes', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations).toEqual(['http://localhost:3000/ar/', 'http://localhost:3000/en/']);
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: http://localhost:3000/sitemap.xml');
});

for (const locale of ['ar', 'en']) {
  for (const width of [390, 1440]) {
    test(`homepage ${locale} at ${width}px`, async ({ page }) => {
      const problems: string[] = [];
      page.on('pageerror', error => problems.push(error.message));
      page.on('console', message => {
        if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text());
      });
      await page.setViewportSize({ width, height: 960 });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator('.project-card')).toHaveCount(12);
      await expect(page.locator('a[href*="/projects/"]')).toHaveCount(0);
      await expect(page.locator('.brand-img')).toHaveCount(0);
      await page.screenshot({ path: `${output}/home-${locale}-${width}.png` });
      for (const section of ['services', 'projects', 'approach', 'contact']) {
        await page.locator('#' + section).scrollIntoViewIfNeeded();
        await expect(page.locator('#' + section + ' h2').first()).toBeVisible();
        await page.screenshot({ path: `${output}/${section}-${locale}-${width}.png` });
      }
      expect(problems).toEqual([]);
    });

    test(`localized 404 ${locale} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      const response = await page.goto(`/${locale}/missing-page/`);
      expect(response?.status()).toBe(404);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toContainText(locale === 'ar' ? 'هذا المسار' : 'This path');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `${output}/404-${locale}-${width}.png` });
      await page.locator('main a').click();
      await expect(page).toHaveURL(new RegExp('/' + locale + '/$'));
    });

    test(`reduced motion ${locale} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`/${locale}/`);
      await expect(page.locator('.workflow')).toHaveAttribute('data-reduced-motion', 'true');
      for (const heading of await page.locator('.section-heading').all()) {
        await expect(heading).toHaveCSS('opacity', '1');
      }
      await expect(page.locator('.workflow animateMotion')).toHaveCount(0);
      const active = width < 1024 ? '.workflow-mobile' : '.workflow-desktop';
      for (const path of await page.locator(active + ' .workflow-edge').all()) {
        await expect(path).toHaveAttribute('stroke-dasharray', '1 1');
      }
    });
  }

  test(`keyboard and mobile drawer ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/`);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await expect(page.locator('.skip-link')).toHaveCSS('outline-width', '2px');
    for (let step = 0; step < 8; step++) {
      if (await page.locator('.nav-actions .mobile-menu-button').evaluate(el => el === document.activeElement)) break;
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('.nav-actions .mobile-menu-button')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog')).toBeVisible();
    for (let step = 0; step < 14; step++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
      expect(await page.evaluate(() => getComputedStyle(document.activeElement!).outlineWidth)).toBe('2px');
    }
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).not.toBeVisible();
    await expect(page.locator('.nav-actions .mobile-menu-button')).toBeFocused();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });
}
