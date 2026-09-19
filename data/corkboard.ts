export type CorkboardPostKind = "markdown" | "audio" | "image" | "video";

interface CorkboardPostBase {
  id: string;
  title: string;
  date: string;
  pinned?: boolean;
}

export interface MarkdownPost extends CorkboardPostBase {
  kind: "markdown";
  description?: string;
}

interface MediaPostBase extends CorkboardPostBase {
  src: string;
  srcTitle?: string;
  description?: string;
}

export interface AudioPost extends MediaPostBase {
  kind: "audio";
  thumbnail?: string;
}

export interface ImagePost extends MediaPostBase {
  kind: "image";
}

export interface VideoPost extends MediaPostBase {
  kind: "video";
  poster?: string;
}

export type MediaPost = AudioPost | ImagePost | VideoPost;

export type CorkboardPost = MarkdownPost | MediaPost;

