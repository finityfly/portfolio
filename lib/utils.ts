import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const AVERAGE_READING_SPEED_WPM = 180;

export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    return iso;
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthIndex = Number(month) - 1;
  const monthName =
    monthIndex >= 0 && monthIndex < monthNames.length
      ? monthNames[monthIndex]
      : month;

  return `${monthName} ${Number(day)}, ${year}`;
};

export const stripMarkdownToPlainText = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/^\s{0,3}(#{1,6}\s)/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const calculateReadingTimeMinutes = (markdown: string): number => {
  const plainText = stripMarkdownToPlainText(markdown);
  const wordCount = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / AVERAGE_READING_SPEED_WPM));
};

export const getYouTubeEmbedUrl = (src: string): string | null => {
  try {
    const url = new URL(src);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId =
        url.searchParams.get("v") ||
        url.pathname.split("/").filter(Boolean)[1] ||
        null;
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtu.be") {
      const videoId = url.pathname.replace(/^\//, "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

export const getMediaMetaLabel = (src: string): string => {
  const cleanPath = src.split("?")[0].split("#")[0];
  const filename = cleanPath.split("/").filter(Boolean).pop() || "media";
  const extension = filename.includes(".")
    ? filename.split(".").pop()?.toUpperCase() || "MEDIA"
    : "MEDIA";
  return extension;
};
