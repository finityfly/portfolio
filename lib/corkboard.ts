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

export interface MasonryColumnEntry {
  post: RenderableCorkboardCardPost;
  index: number;
}

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

const estimateCardHeight = (
  post: RenderableCorkboardCardPost,
  index: number
): number => {
  const baseHeight = 200;
  const frameVariant = getMediaFrameVariant(post, index);

  if (post.kind === "audio") {
    return baseHeight + 210;
  }

  if (post.kind === "image" || post.kind === "video") {
    return baseHeight + (frameVariant === "tall" ? 310 : 240);
  }

  return baseHeight + 170;
};

export const distributeMasonryColumns = (
  posts: RenderableCorkboardCardPost[],
  columnCount: number
): MasonryColumnEntry[][] => {
  const count = Math.max(1, columnCount);
  const columns: MasonryColumnEntry[][] = Array.from(
    { length: count },
    () => []
  );
  const heights = new Array<number>(count).fill(0);

  posts.forEach((post, index) => {
    const estimate = estimateCardHeight(post, index);
    const targetColumn = heights.indexOf(Math.min(...heights));

    columns[targetColumn].push({ post, index });
    heights[targetColumn] += estimate;
  });

  return columns;
};
