"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type NavSfxProviderProps = {
  children?: ReactNode;
};

const NavSfxProvider = ({ children }: NavSfxProviderProps) => {
  const baseAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playClick = () => {
      if (!baseAudioRef.current) {
        return;
      }

      const audio = baseAudioRef.current.cloneNode(true) as HTMLAudioElement;
      const pitchVariation = 0.3;
      const pitchOffset = (Math.random() * 2 - 1) * pitchVariation;
      audio.volume = 0.5;
      audio.preservesPitch = false;
      (audio as HTMLAudioElement & { mozPreservesPitch?: boolean }).mozPreservesPitch = false;
      audio.playbackRate = 1 + pitchOffset;
      audio.defaultPlaybackRate = 1 + pitchOffset;
      audio.currentTime = 0;
      void audio.play();
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      const navTarget = target.closest("[data-nav-sfx]");
      if (!navTarget) {
        return;
      }

      if (navTarget.getAttribute("data-nav-sfx") === "off") {
        return;
      }

      playClick();
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
