import {
  CorkboardPost,
} from "@/data/corkboard";
import { MediaPost } from "@/data/corkboard";

export type MarkdownPostWithReadingTime = import("@/data/corkboard").MarkdownPost & {
  readingTimeMinutes?: number;
};

export type MarkdownPostWithContent = import("@/data/corkboard").MarkdownPost & {
  content: string;
};

export type RenderableCorkboardCardPost =
  | MarkdownPostWithReadingTime
  | MediaPost;

export type RenderableCorkboardPost = MarkdownPostWithContent | MediaPost;

export type MediaFrameVariant = "wide" | "tall";

export const byPinnedThenNewest = (a: CorkboardPost, b: CorkboardPost) => {
  if (a.pinned && !b.pinned) {
    return -1;
  }
  if (!a.pinned && b.pinned) {
    return 1;
  }
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const getMediaFrameVariant = (
  post: RenderableCorkboardCardPost,
  index: number
): MediaFrameVariant => {
  if (post.kind !== "image" && post.kind !== "video") {
    return "wide";
  }

  return index % 4 === 0 ? "tall" : "wide";
};

