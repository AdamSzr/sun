
/**
 * Normalizes leading and/or trailing slashes in a path.
 *
 * @param options.start - Controls the leading slash:
 * `true` = ensure, `false` = remove, `undefined` = unchanged
 * @param options.end - Controls the trailing slash:
 * `true` = ensure, `false` = remove, `undefined` = unchanged
 *
 * @example
 * normalizeSlashes("foo/bar",     { start: true,  end: true })  // "/foo/bar/"
 * normalizeSlashes("//foo/bar//", { start: true,  end: true })  // "/foo/bar/"
 * normalizeSlashes("/foo/bar/",   { start: false, end: false }) // "foo/bar"
 * normalizeSlashes("/foo/bar/",   { start: true })              // "/foo/bar/"
 * normalizeSlashes("foo/bar",     { end:   true })              // "foo/bar/"
 */
export function normalizeSlashes(path: string, { start, end }: { start?: boolean, end?: boolean }) {
  if (start !== undefined) {
    path = path.replace(/^\/+/, ``)
    if (start) path = `/${path}`
  }

  if (end !== undefined) {
    path = path.replace(/\/+$/, ``)
    if (end) path = `${path}/`
  }

  return path
}

export function getQueryFlags<T extends string>(queryObj: Record<string, unknown>, fields: T[]) {
  return fields.reduce((obj, field) => ({ ...obj, [field]: queryObj[field] === `` }), {}) as Record<T, boolean>
}
