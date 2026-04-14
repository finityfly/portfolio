import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  RiPauseFill,
  RiPlayCircleLine,
  RiPlayFill,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from "react-icons/ri";
import styles from "@/pages/corkboard/PostMedia.module.css";
import {
  formatTime,
  isLinkedSource,
  MediaPlayerBaseProps,
  preventNav,
  preventSliderClick,
  preventSliderPointer,
  progressToStyle,
  volumeToStyle,
} from "./mediaPlayerUtils";

interface CustomVideoPlayerProps extends MediaPlayerBaseProps {
  src: string;
  poster?: string;
  youtubeEmbedSrc?: string | null;
  frameVariant?: "wide" | "tall";
}

const inlinePlaybackAttrs = {
  "webkit-playsinline": "true",
  playsinline: "true",
} as Record<string, string>;

export const CustomVideoPlayer = ({
  src,
  title,
  poster,
  youtubeEmbedSrc,
  frameVariant = "wide",
  compact = false,
}: CustomVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isLinkedContent = Boolean(youtubeEmbedSrc) || isLinkedSource(src);
  const preMuteVolumeRef = useRef(1);
  const fadeAnimRef = useRef<number | null>(null);

  const animateVolume = (from: number, to: number) => {
    if (fadeAnimRef.current) cancelAnimationFrame(fadeAnimRef.current);
    const media = videoRef.current;
    const start = performance.now();
    const dur = 120;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      // cubic ease-in-out
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const vol = Math.min(1, Math.max(0, from + (to - from) * eased));
      if (media) {
        media.volume = vol;
        setVolume(vol);
      }
      if (t < 1) {
        fadeAnimRef.current = requestAnimationFrame(tick);
      }
    };
    fadeAnimRef.current = requestAnimationFrame(tick);
  };

  const progressPercent = useMemo(() => {
    if (duration <= 0) {
      return 0;
    }
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);

  useEffect(() => {
    const media = videoRef.current;
    if (!media || youtubeEmbedSrc) {
      return () => undefined;
    }

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(media.duration) ? media.duration : 0);
      setCurrentTime(media.currentTime || 0);
      setVolume(typeof media.volume === "number" ? media.volume : 1);
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    media.addEventListener("loadedmetadata", handleLoadedMetadata);
    media.addEventListener("timeupdate", handleTimeUpdate);
    media.addEventListener("play", handlePlay);
    media.addEventListener("pause", handlePause);
    media.addEventListener("ended", handleEnded);
    media.addEventListener("error", handleError);

    return () => {
      media.removeEventListener("loadedmetadata", handleLoadedMetadata);
      media.removeEventListener("timeupdate", handleTimeUpdate);
      media.removeEventListener("play", handlePlay);
      media.removeEventListener("pause", handlePause);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("error", handleError);
    };
  }, [youtubeEmbedSrc]);

  useEffect(() => {
    return () => {
      if (fadeAnimRef.current) cancelAnimationFrame(fadeAnimRef.current);
    };
  }, []);

  const togglePlayPause = async () => {
    const media = videoRef.current;
    if (!media || hasError || youtubeEmbedSrc) {
      return;
    }

    if (media.paused) {
      try {
        await media.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    media.pause();
  };

  const onSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const media = videoRef.current;
    if (!media || hasError || youtubeEmbedSrc) {
      return;
    }

    const nextValue = Number(event.target.value);
    media.currentTime = nextValue;
    setCurrentTime(nextValue);
  };

  const toggleMute = (event: React.MouseEvent<HTMLButtonElement>) => {
    preventNav(event);
    const media = videoRef.current;
    if (!media || hasError || youtubeEmbedSrc) return;
    if (!isMuted) {
      preMuteVolumeRef.current = volume > 0 ? volume : 1;
      setIsMuted(true);
      animateVolume(volume, 0);
    } else {
      setIsMuted(false);
      animateVolume(0, preMuteVolumeRef.current);
    }
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const media = videoRef.current;
    if (!media || hasError || youtubeEmbedSrc) {
      return;
    }

    if (fadeAnimRef.current) cancelAnimationFrame(fadeAnimRef.current);
    const nextValue = Number(event.target.value);
    media.volume = nextValue;
    setVolume(nextValue);
    if (isMuted) setIsMuted(false);
  };

  return (
    <Box
      className={compact ? styles.mediaShellCompact : styles.mediaShell}
      transition="all 0.3s ease-in-out"
      maxW="100%"
      boxSizing="border-box"
      onClick={preventNav}
      onMouseDown={preventNav}
      onPointerDown={preventNav}
    >
      <Stack spacing={2.5} maxW="100%" minW={0}>
        <Flex className={styles.mediaTitleBar}>
          <Flex className={styles.mediaTitleLead}>
            <Box className={`${styles.mediaBadgeSquare} ${styles.mediaBadgeFallback}`}>
              <Icon
                as={RiPlayCircleLine}
                className={styles.mediaBadgeFallbackIcon}
              />
            </Box>

            <Text className={styles.mediaSourceTitle} noOfLines={1} minW={0}>
              {title}
            </Text>
          </Flex>

          {!isLinkedContent ? (
            <Box
              className={styles.volumeControl}
              onClick={preventNav}
              onMouseDown={preventNav}
              onPointerDown={preventNav}
            >
              <Box className={styles.volumeSliderWrap}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={onVolumeChange}
                  onClick={preventSliderClick}
                  onMouseDown={preventSliderPointer}
                  onPointerDown={preventSliderPointer}
                  className={styles.volumeSlider}
                  style={volumeToStyle(volume)}
                  aria-label={`Volume for ${title}`}
                  disabled={hasError}
                />
              </Box>
              <Box
                as="button"
                className={styles.volumeIcon}
                onClick={toggleMute}
                onMouseDown={preventNav}
                onPointerDown={preventNav}
                aria-label={isMuted ? "Unmute" : "Mute"}
                disabled={hasError}
                style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
              >
                <Icon as={isMuted ? RiVolumeMuteLine : RiVolumeUpLine} boxSize={4.5} display="block" />
              </Box>
            </Box>
          ) : null}
        </Flex>

        <Box
          className={`${styles.videoFrame} ${
            frameVariant === "tall" ? styles.videoFrameTall : ""
          }`}
        >
          {youtubeEmbedSrc ? (
            <iframe
              src={youtubeEmbedSrc}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={styles.videoEmbed}
            />
          ) : (
            <video
              {...inlinePlaybackAttrs}
              ref={videoRef}
              className={styles.videoPlayer}
              controls={false}
              src={src}
              poster={poster}
              preload="metadata"
              disableRemotePlayback
              playsInline
              onMouseDown={preventNav}
              onPointerDown={preventNav}
              onClick={(event) => {
                preventNav(event);
                void togglePlayPause();
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </Box>

        {!youtubeEmbedSrc ? (
          <Stack spacing={1.5} maxW="100%" minW={0}>
            <Flex className={styles.mediaControlsRow}>
              <motion.button
                type="button"
                className={styles.transportButton}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.18 }}
                onMouseDown={preventNav}
                onPointerDown={preventNav}
                onClick={(event) => {
                  preventNav(event);
                  void togglePlayPause();
                }}
                disabled={hasError}
                aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
              >
                <Icon as={isPlaying ? RiPauseFill : RiPlayFill} boxSize={5} display="block" />
              </motion.button>

              <Box className={styles.progressWrap}>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={Math.min(currentTime, duration || currentTime)}
                  onChange={onSeek}
                  onClick={preventSliderClick}
                  onMouseDown={preventSliderPointer}
                  onPointerDown={preventSliderPointer}
                  step={0.01}
                  className={styles.progressTrack}
                  style={progressToStyle(progressPercent)}
                  aria-label={`Seek in ${title}`}
                  disabled={hasError || duration <= 0}
                />
              </Box>

              <Text className={styles.mediaTimeLabel} minW={0}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </Flex>
          </Stack>
        ) : null}
      </Stack>

      {hasError && (
        <Text className={styles.mediaHintText} mt={2}>
          Could not load video source.
        </Text>
      )}
    </Box>
  );
};
