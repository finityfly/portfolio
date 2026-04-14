import {
  Box,
  Flex,
  Icon,
  Image,
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
  RiMusic2Line,
  RiPauseFill,
  RiPlayFill,
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

interface CustomAudioPlayerProps extends MediaPlayerBaseProps {
  src: string;
  thumbnail?: string;
}

export const CustomAudioPlayer = ({
  src,
  title,
  thumbnail,
  compact = false,
}: CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hasError, setHasError] = useState(false);
  const isLinkedContent = isLinkedSource(src);

  const progressPercent = useMemo(() => {
    if (duration <= 0) {
      return 0;
    }
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);

  useEffect(() => {
    const media = audioRef.current;
    if (!media) {
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
  }, []);

  const togglePlayPause = async () => {
    const media = audioRef.current;
    if (!media || hasError) {
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
    const media = audioRef.current;
    if (!media || hasError) {
      return;
    }

    const nextValue = Number(event.target.value);
    media.currentTime = nextValue;
    setCurrentTime(nextValue);
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const media = audioRef.current;
    if (!media || hasError) {
      return;
    }

    const nextValue = Number(event.target.value);
    media.volume = nextValue;
    setVolume(nextValue);
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
      <audio
        ref={audioRef}
        src={src}
        controls={false}
        preload="metadata"
        className={styles.mediaElementHidden}
      >
        Your browser does not support the audio element.
      </audio>

      <Stack spacing={1.5} maxW="100%" minW={0}>
        <Flex className={styles.mediaTitleBar}>
          <Flex className={styles.mediaTitleLead}>
            <Box
              className={`${styles.mediaBadgeSquare} ${
                thumbnail ? "" : styles.mediaBadgeFallback
              }`}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={`${title} cover`}
                  className={styles.mediaBadgeImage}
                  objectFit="cover"
                />
              ) : (
                <Icon
                  as={RiMusic2Line}
                  className={styles.mediaBadgeFallbackIcon}
                />
              )}
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
              <Box className={styles.volumeIcon}>
                <Icon as={RiVolumeUpLine} boxSize={4.5} display="block" />
              </Box>
            </Box>
          ) : null}
        </Flex>

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

      {hasError && (
        <Text className={styles.mediaHintText} mt={2}>
          Could not load audio source.
        </Text>
      )}
    </Box>
  );
};
