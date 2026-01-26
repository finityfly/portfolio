import {
  Box,
  Image as ChkImage,
  Text,
  Link,
  SkeletonCircle,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { avatarAnimation } from "config/animations";

const AvatarImages = {
  DarkMode: "/pfp.png",
  LightMode: "/pfp.png",
};

declare global {
  interface Window {
    preloadedPictures?: HTMLImageElement[];
  }
}

const Avatar = () => {
  const MotionBox = motion(Box);
  const imgAvatar = useColorModeValue(
    AvatarImages.LightMode,
    AvatarImages.DarkMode
  );
  useEffect(() => {
    // Some nice preloading and caching
    const images = [AvatarImages.DarkMode, AvatarImages.LightMode];
    const preloadedImages = images.map((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      return img;
    });
    window.preloadedPictures = preloadedImages;
  }, []);
  return (
    <AnimatePresence>
      <MotionBox
        id="dlAvatar"
        boxSize={{ base: 64, md: 56, lg: "sm" }}
        padding={{ base: 8, md: 6, lg: 8 }}
        marginBottom={{ base: 10, md: 8, lg: 0 }}
        initial="initial"
        animate={"animate"}
        variants={avatarAnimation}
        exit={{ opacity: 0 }}
      >
        <ChkImage
          borderRadius="full"
          boxSize={{ base: "250px", md: "200px", lg: "250px" }}
          objectFit="cover"
          objectPosition="0 20%"
          src={imgAvatar}
          alt="Daniel Lu"
          htmlWidth="300"
          htmlHeight="300"
          margin="auto"
          fallback={
            <SkeletonCircle
              height={{ base: "250px", md: "200px", lg: "250px" }}
              width={{ base: "250px", md: "200px", lg: "250px" }}
            />
          }
          border="3px solid"
          borderColor={useColorModeValue("teal.500", "cyan.200")}
        />
      </MotionBox>
    </AnimatePresence>
  );
};

export default Avatar;
