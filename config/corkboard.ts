export type CorkboardPostKind = "markdown" | "audio" | "image" | "video";

interface CorkboardPostBase {
  id: string;
  title: string;
  /**
   * ISO date string, e.g. "2026-03-26"
   */
  date: string;
  tags?: string[];
}

export interface MarkdownPost extends CorkboardPostBase {
  kind: "markdown";
  /**
   * Optional short summary that will be shown in the list.
   */
  summary?: string;
  /**
   * Path to a markdown file inside the project (e.g. "content/corkboard/welcome.md").
   */
  markdownPath: string;
}

export interface MediaPost extends CorkboardPostBase {
  kind: "audio" | "image" | "video";
  /**
   * Public path or remote URL to the media file.
   * For local files, place them under /public/corkboard and reference
   * them like "/corkboard/your-file.ext".
   */
  src: string;
  /**
   * Optional short description or caption shown under the media.
   */
  description?: string;
  /**
   * Optional thumbnail image path for audio or video entries.
   */
  thumbnail?: string;
}

export type CorkboardPost = MarkdownPost | MediaPost;

/**
 * Corkboard content
 *
 * To add a new entry:
 * - For markdown posts (notes, essays): use kind: "markdown" and edit the
 *   `markdownPath` field to point to a .md file.
 * - For media-only posts (audio, image, video): use kind: "audio" | "image" | "video"
 *   and point `src` at a file inside /public/corkboard or a remote URL.
 */
export const corkboardPosts: CorkboardPost[] = [
  {
    id: "welcome-note",
    kind: "markdown",
    title: "Welcome to the corkboard",
    date: "2026-03-26",
    tags: ["meta"],
    summary:
      "A space for quick notes, half-baked ideas, and anything that doesn’t fit neatly elsewhere.",
    markdownPath: "content/corkboard/welcome-note.md",
  },
  {
    id: "sample-audio",
    kind: "audio",
    title: "Sample audio post",
    date: "2026-03-26",
    tags: ["audio", "demo"],
    src: "/corkboard/sample-audio.mp3",
    description:
      "Drop your own mp3 files into `/public/corkboard` and point `src` at them.",
  },
  {
    id: "sample-image",
    kind: "image",
    title: "Sample image pin",
    date: "2026-03-26",
    tags: ["image", "demo"],
    src: "/corkboard/sample-image.jpg",
    description:
      "Use this for screenshots, reference photos, or anything else you’d normally pin to a real corkboard.",
  },
  {
    id: "sample-video",
    kind: "video",
    title: "Sample video note",
    date: "2026-03-26",
    tags: ["video", "demo"],
    src: "/corkboard/sample-video.mp4",
    description:
      "You can also embed short video clips here – local files or hosted URLs.",
  },
];

