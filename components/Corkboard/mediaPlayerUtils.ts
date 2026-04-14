import { CSSProperties, SyntheticEvent } from "react";

export const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const progressToStyle = (progressPercent: number): CSSProperties => ({
  ["--progress" as string]: `${progressPercent}%`,
});

export const isLinkedSource = (src: string): boolean => /^https?:\/\//i.test(src);

export const volumeToStyle = (value: number): CSSProperties => ({
  ["--volume-progress" as string]: `${Math.max(0, Math.min(100, value * 100))}%`,
});

export const preventNav = (event: SyntheticEvent<HTMLElement>) => {
  event.preventDefault();
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

export const preventSliderClick = (event: SyntheticEvent<HTMLInputElement>) => {
  event.preventDefault();
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

export const preventSliderPointer = (event: SyntheticEvent<HTMLInputElement>) => {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

export interface MediaPlayerBaseProps {
  title: string;
  metaLabel?: string;
  compact?: boolean;
}
