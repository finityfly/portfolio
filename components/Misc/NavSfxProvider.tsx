"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type NavSfxProviderProps = {
  children?: ReactNode;
};

const NavSfxProvider = ({ children }: NavSfxProviderProps) => {
  const baseAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {

    const playClick = (pitch: number) => {
      if (!baseAudioRef.current) return;
      const audio = baseAudioRef.current.cloneNode(true) as HTMLAudioElement;
      audio.volume = 0.5;
      audio.preservesPitch = false;
      (audio as HTMLAudioElement & { mozPreservesPitch?: boolean }).mozPreservesPitch = false;
      audio.playbackRate = pitch;
      audio.defaultPlaybackRate = pitch;
      audio.currentTime = 0;
      void audio.play();
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      const navTarget = target.closest("[data-nav-sfx]");
      if (!navTarget) return;
      if (navTarget.getAttribute("data-nav-sfx") !== "theme") return;

      const html = document.documentElement;
      const theme = html.getAttribute("data-theme");
      if (theme === "light") {
        playClick(0.8); // light to dark
      } else if (theme === "dark") {
        playClick(1.2); // dark to light
      } else {
        playClick(1);
      }
    };

    document.addEventListener("click", onDocumentClick, { capture: true });
    if (!baseAudioRef.current) {
      baseAudioRef.current = new Audio("/sfx/nav-click.mp3");
      baseAudioRef.current.preload = "auto";
    }
    return () => {
      document.removeEventListener("click", onDocumentClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
};

export default NavSfxProvider;
