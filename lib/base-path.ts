// Next applies basePath to <Link> and router navigation automatically, but it
// leaves raw strings alone: metadata icons, meta-refresh targets, next/image
// src values, and any pathname the browser reports back to us. Those go
// through here so the prefix is defined in exactly one place.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a root-relative path with the deployment basePath. */
export function withBasePath(path: string) {
  return `${basePath}${path}`;
}

/** Strip the deployment basePath off a pathname read from the browser. */
export function stripBasePath(pathname: string) {
  return basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname;
}
