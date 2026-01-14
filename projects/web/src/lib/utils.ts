import type { ImageSrcSet } from "@somni.one/common";

export const BLACK_IMAGE_ENCODED = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

export function transformRemoteAssetPath(path?: string): string | null {
  return path ? `${import.meta.env.VITE_REMOTE_ASSETS_HOST_URL}/${path.startsWith("/") ? path.slice(1) : path}` : null;
}

export function generateImageSrcSet(srcSet?: ImageSrcSet[]): string | null {
  return srcSet?.map(({ path, scale }) => `${transformRemoteAssetPath(path)} ${scale ? `${scale}x` : ""}`).join(", ") ?? null;
}
