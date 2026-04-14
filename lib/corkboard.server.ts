import fs from "fs/promises";
import path from "path";
import { corkboardPosts } from "@/data/corkboard";
import { calculateReadingTimeMinutes } from "@/lib/utils";
import {
  byPinnedThenNewest,
  RenderableCorkboardCardPost,
  RenderableCorkboardPost,
} from "@/lib/corkboard";

const getMarkdownAbsolutePath = (markdownPath: string): string =>
  path.join(process.cwd(), "data", "corkboard", markdownPath);

export const getRenderableCorkboardCardPosts = async (): Promise<
  RenderableCorkboardCardPost[]
> => {
  const sortedPosts = [...corkboardPosts].sort(byPinnedThenNewest);

  const posts = await Promise.all(
    sortedPosts.map(async (post): Promise<RenderableCorkboardCardPost> => {
      if (post.kind !== "markdown") {
        return post;
      }

      try {
        const absolutePath = getMarkdownAbsolutePath(post.markdownPath);
        const content = await fs.readFile(absolutePath, "utf8");

        return {
          ...post,
          readingTimeMinutes: calculateReadingTimeMinutes(content),
        };
      } catch {
        return post;
      }
    })
  );

  return posts;
};

export const getRenderableCorkboardPostById = async (
  id: string
): Promise<
  | {
      post: RenderableCorkboardPost;
      readingTimeMinutes?: number;
    }
  | null
> => {
  const post = corkboardPosts.find((entry) => entry.id === id);

  if (!post) {
    return null;
  }

  if (post.kind !== "markdown") {
    return {
      post,
    };
  }

  const absolutePath = getMarkdownAbsolutePath(post.markdownPath);
  const content = await fs.readFile(absolutePath, "utf8");

  return {
    post: {
      ...post,
      content,
    },
    readingTimeMinutes: calculateReadingTimeMinutes(content),
  };
};