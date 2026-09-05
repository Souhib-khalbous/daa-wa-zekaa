import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignored = new Set([
  '.git', 'node_modules', '.next', '.vinext', 'out', 'dist', 'build',
  'coverage', 'outputs', 'work', 'test-results', 'playwright-report',
]);
const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.json', '.md', '.txt']);
const forbiddenOrigin = ['chatgpt', 'site'].join('.');
const physical = /\b(?:ml-|mr-|pl-|pr-|left-|right-|text-left|text-right)|(?:^|[;{\s])(?:left|right)\s*:/g;
let originCount = 0;
let directionCount = 0;

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(path);
    } else if (textExtensions.has(extname(entry.name)) || entry.name === '.env.example') {
      const source = await readFile(path, 'utf8');
      const origins = source.split(forbiddenOrigin).length - 1;
      const component = path.startsWith(join(root, 'components') + '/') ||
        path.startsWith(join(root, 'components') + '\\');
      const directions = component ? [...source.matchAll(physical)].length : 0;
      originCount += origins;
      directionCount += directions;
      if (origins || directions) console.error(path, { origins, directions });
    }
  }
}
await scan(root);
console.log('Sandbox hostname occurrences:', originCount);
console.log('Physical-direction patterns in components:', directionCount);
if (originCount || directionCount) process.exitCode = 1;
