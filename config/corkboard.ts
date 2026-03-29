export type CorkboardPostKind = "markdown" | "audio" | "image" | "video";

interface CorkboardPostBase {
  id: string;
  title: string;
  date: string;
}

export interface MarkdownPost extends CorkboardPostBase {
  kind: "markdown";
  description?: string;
  markdownPath: string;
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

export const corkboardPosts: CorkboardPost[] = [
  {
    id: "why-i-made-this",
    kind: "markdown",
    title: "Why I Made This",
    date: "2026-03-29",
    description:
      "A short note on why this space exists, and why I think everyone should have one.",
    markdownPath: "content/corkboard/why-i-made-this.md",
  },
  {
    id: "been-so-long",
    kind: "audio",
    title: "been so long - mflo",
    date: "2026-03-25",
    src: "/corkboard/been_so_long.mp3",
    srcTitle: "been so long - mflo",
    description:
      "One of my favourite songs by mflo.",
  },
  {
    id: "mimikyu-image",
    kind: "image",
    title: "mimikyu",
    date: "2026-03-25",
    src: "/corkboard/mimi.jpg",
  },
  {
    id: "manuel-riff",
    kind: "video",
    title: "The Single Riff That Made Me Learn Guitar",
    date: "2026-03-27",
    src: "https://www.youtube.com/watch?v=XGmoZn0nbrY",
    srcTitle: "the biggest shred collab song in the world 5 - Manuel Gardner Fernandes part",
    description:
      `Introducing Manuel Gardner-Fernandes, a modern guitar player that I believe deserves far more recognition than he currently has.
      
      He's achieved the rare balance between technical precision and musicality without ever feeling forced. This particular riff is a great example of his style, and happens to be the one that made me lose my guitar virginity. 
      
      Check out his channel if you like what you hear, it's a gold mine for rhythmic guitar ideas.`,
  },
];

