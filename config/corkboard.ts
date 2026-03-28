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
  *
  * Notes:
  * - kind: "image" supports direct remote image URLs.
  * - kind: "video" supports direct video URLs and YouTube links.
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
    id: "lorem-markdown",
    kind: "markdown",
    title: "Lorem Markdownum",
    date: "2026-03-26",
    tags: ["lorem"],
    summary:
      "Et pectore dixut iugulo",
    markdownPath: "content/corkboard/lorem-markdown.md",
  },
  {
    id: "been-so-long",
    kind: "audio",
    title: "been so long - mflo",
    date: "2026-03-26",
    tags: ["audio", "demo"],
    src: "/corkboard/been_so_long.mp3",
    description:
      "one of my favourite songs by mflo, check them out if you like what you hear!",
  },
  {
    id: "mimikyu-image",
    kind: "image",
    title: "mimikyu.",
    date: "2026-03-25",
    tags: ["image"],
    src: "/corkboard/mimi.jpg",
    description:
      "mimikyu.",
  },
  {
    id: "manuel-whammy",
    kind: "video",
    title: "the best riff in the world",
    date: "2026-03-26",
    tags: ["video", "demo"],
    src: "https://www.youtube.com/watch?v=XGmoZn0nbrY",
    description:
      "all credit goes to manual gardner-fernandes 🐐",
  },
];

