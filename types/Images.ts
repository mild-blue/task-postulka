/**
 * Generated from GIPHY API docs: https://developers.giphy.com/docs/api/schema/#image-object
 * with ChatGPT (GPT-5)
 */

/** Base field shapes (GIPHY returns most numeric fields as strings) */
interface Dimensional {
  width?: string;
  height?: string;
}

interface UrlField {
  url?: string;
}

interface SizeField {
  size?: string; // bytes, as string
}

interface Mp4Fields {
  mp4?: string;
  mp4_size?: string; // bytes, as string
}

interface WebpFields {
  webp?: string;
  webp_size?: string; // bytes, as string
}

/** Common animated rendition: URL + dimensions + optional size/mp4/webp */
export type ImageRendition =
  & UrlField
  & Dimensional
  & Partial<SizeField & Mp4Fields & WebpFields>;

/** Static “still” rendition: URL + dimensions */
export type StillRendition = UrlField & Dimensional;

/** Downsampled (usually fewer frames), same shape as ImageRendition */
export type DownsampledRendition = ImageRendition;

/** Downsized (by target size thresholds), same shape as ImageRendition */
export type DownsizedRendition = ImageRendition;

/** Downsized small: mp4-only preview + dimensions + mp4_size */
export interface DownsizedSmallRendition extends Dimensional {
  mp4?: string;
  mp4_size?: string;
}

/** Original: full data incl. frames + mp4/webp/size + dimensions */
export interface OriginalRendition extends Dimensional, SizeField, Mp4Fields, WebpFields {
  url?: string;
  frames?: string;
}

/** Looping: 15s looping mp4 */
export interface LoopingRendition {
  mp4?: string;
}

/** MP4 preview (≈ first 1–2s, ≤ ~50 KB) + dimensions + mp4_size */
export interface PreviewRendition extends Dimensional {
  mp4?: string;
  mp4_size?: string;
}

/** GIF preview (≈ first 1–2s) + dimensions */
export type PreviewGifRendition = StillRendition;

/**
 * The Images Object:
 * Contains multiple rendition objects; any may be absent for a given GIF.
 */
export interface Images {
  /** Fixed-height variants (≈200px) */
  fixed_height?: ImageRendition;
  fixed_height_still?: StillRendition;
  fixed_height_downsampled?: DownsampledRendition;

  /** Fixed-width variants (≈200px) */
  fixed_width?: ImageRendition;
  fixed_width_still?: StillRendition;
  fixed_width_downsampled?: DownsampledRendition;

  /** Small (≈100px) keyboard-friendly variants */
  fixed_height_small?: ImageRendition;
  fixed_height_small_still?: StillRendition;
  fixed_width_small?: ImageRendition;
  fixed_width_small_still?: StillRendition;

  /** Downsized variants (by target filesize thresholds) */
  downsized?: DownsizedRendition;
  downsized_still?: StillRendition;
  downsized_large?: DownsizedRendition;
  downsized_medium?: DownsizedRendition;
  downsized_small?: DownsizedSmallRendition;

  /** Original & helpers */
  original?: OriginalRendition;
  original_still?: StillRendition;
  looping?: LoopingRendition;

  /** Previews */
  preview?: PreviewRendition;
  preview_gif?: PreviewGifRendition;
}
