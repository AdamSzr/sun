export function normalizeSlashes(path: string, { start = true, end = false } = {}) {
  if (start) {
    if (!path.startsWith(`/`)) path = `/${path}`;
  } else {
    if (path.startsWith(`/`)) path = path.slice(1);
  }

  if (end) {
    if (!path.endsWith(`/`)) path = `${path}/`;
  } else {
    if (path.endsWith(`/`)) path = path.slice(0, -1);
  }

  return path;
}