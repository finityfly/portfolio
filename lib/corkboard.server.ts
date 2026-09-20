import matter from "gray-matter";
import { CorkboardPost, MediaPost } from "@/data/corkboard";
import generatedEntries from "@/data/corkboard/entries.generated.json";
import { calculateReadingTimeMinutes } from "@/lib/utils";
import {
  byPinnedThenNewest,
  RenderableCorkboardCardPost,
  RenderableCorkboardPost,
} from "@/lib/corkboard";

interface CorkboardEntry {
  id: string;
  post: CorkboardPost;
  content: string;
}

const requireString = (
  data: Record<string, unknown>,
  field: string,
  id: string
): string => {
  const value = data[field];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Corkboard entry "${id}" is missing required field "${field}"`);
  }
  return value;
};

// Returns {} (not { [field]: undefined }) when absent — Next.js's props
// serializer rejects keys whose value is undefined, even if unset.
const optionalString = (
  data: Record<string, unknown>,
  field: string
): Record<string, string> => {
  const value = data[field];
  return typeof value === "string" ? { [field]: value } : {};
};

// YAML parses an unquoted date like `2026-04-01` as a Date, not a string.
const readDate = (data: Record<string, unknown>, id: string): string => {
  const raw = data.date;
  if (raw instanceof Date) {
    return raw.toISOString().slice(0, 10);
  }
  return requireString(data, "date", id);
};

const toCorkboardPost = (id: string, data: Record<string, unknown>): CorkboardPost => {
  const title = requireString(data, "title", id);
  const date = readDate(data, id);
  const pinned = data.pinned === true;
  const base = { id, title, date, pinned, ...optionalString(data, "description") };

  switch (data.kind) {
    case "markdown":
      return { ...base, kind: "markdown" };
    case "audio":
      return {
        ...base,
        kind: "audio",
        src: requireString(data, "src", id),
        ...optionalString(data, "srcTitle"),
        ...optionalString(data, "thumbnail"),
      };
    case "image":
      return {
        ...base,
        kind: "image",
        src: requireString(data, "src", id),
        ...optionalString(data, "srcTitle"),
      };
    case "video":
      return {
        ...base,
        kind: "video",
        src: requireString(data, "src", id),
        ...optionalString(data, "srcTitle"),
        ...optionalString(data, "poster"),
      };
    default:
      throw new Error(
        `Corkboard entry "${id}" has unrecognized kind "${String(data.kind)}" (expected markdown, audio, image, or video)`
      );
  }
};

const readEntries = (): CorkboardEntry[] =>
  generatedEntries.map(({ id, raw }) => {
    const { data, content } = matter(raw);
    return { id, post: toCorkboardPost(id, data), content };
  });

export const getAllCorkboardPostIds = async (): Promise<string[]> =>
  generatedEntries.map(({ id }) => id);

export const getRenderableCorkboardCardPosts = async (): Promise<
  RenderableCorkboardCardPost[]
> => {
  const entries = await readEntries();
  const sorted = [...entries].sort((a, b) => byPinnedThenNewest(a.post, b.post));

  return sorted.map(({ post, content }) => {
    if (post.kind !== "markdown") {
      return post;
    }

    return {
      ...post,
      readingTimeMinutes: calculateReadingTimeMinutes(content),
    };
  });
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
  const entries = await readEntries();
  const entry = entries.find((candidate) => candidate.id === id);

  if (!entry) {
    return null;
  }

  const { post, content } = entry;

  if (post.kind !== "markdown") {
    return { post: post as MediaPost };
  }

  return {
    post: { ...post, content },
    readingTimeMinutes: calculateReadingTimeMinutes(content),
  };
};
