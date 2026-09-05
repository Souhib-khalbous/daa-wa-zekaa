import { bilingual, type Locale } from '@/lib/i18n';
export const site = {
  name: 'داء و ذكاء',
  origin: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  hasLogo: process.env.NEXT_PUBLIC_HAS_LOGO === 'true',
  hasOg: process.env.NEXT_PUBLIC_HAS_OG === 'true',
  ogWidth: Number(process.env.NEXT_PUBLIC_OG_WIDTH) || 1200,
  ogHeight: Number(process.env.NEXT_PUBLIC_OG_HEIGHT) || 630,
  logoWidth: Number(process.env.NEXT_PUBLIC_LOGO_WIDTH) || 180,
  logoHeight: Number(process.env.NEXT_PUBLIC_LOGO_HEIGHT) || 72,
  description: bilingual('نحوّل الأعمال المتكررة إلى أنظمة ذكية تعمل تلقائياً.', 'We turn repetitive work into intelligent systems that run automatically.'),
  message: bilingual('مرحباً، لدي فكرة مشروع وأرغب في مناقشة أتمتتها.', 'Hello, I have a project idea and would like to discuss automating it.'),
  navigation: [{ id: 'services', label: bilingual('خدماتنا', 'Services') }, { id: 'projects', label: bilingual('أعمالنا', 'Projects') }, { id: 'approach', label: bilingual('كيف نعمل', 'How we work') }, { id: 'contact', label: bilingual('تواصل معنا', 'Contact') }],
};
export function whatsappUrl(locale: Locale) {
  return /^[1-9]\d{7,14}$/.test(site.whatsappNumber) ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.message[locale])}` : null;
}
