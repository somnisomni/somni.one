export function transformRemoteAssetPath(path?: string): string | null {
  return path ? `${import.meta.env.VITE_REMOTE_ASSETS_HOST_URL}/${path.startsWith("/") ? path.slice(1) : path}` : null;
}
