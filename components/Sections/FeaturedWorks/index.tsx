"use client";

import { memo, useState } from "react";
import { Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";
import WorkCard from "./WorkCard";
import { fadeInUpSlower, galleryStagger } from "config/animations";
import { mobileBreakpointsMap } from "config/theme";
import { Work, Works } from "config/works";

const MotionDiv = motion.div;
const FeaturedWorksSection = () => {
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWork, setSelectedWork] = useState<string>("");

  const openModal = (title: string) => {
    setSelectedWork(title);
    onOpen();
  };

  return (
    <Stack
      width={{ base: "99%", lg: "60%", xl: "75%" }}
      height="100%"
      spacing={{ base: 6, xl: 8 }}
    >
      {/* <Heading
        size="2xl"
        style={{
          fontVariantCaps: "small-caps",
        }}
      >
        What I&apos;ve been up to
      </Heading> */}
      {/* <Text variant="description">
        Check out some of the projects I made for fun, for clients, or for
        hackathons.
      </Text> */}
      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        variants={galleryStagger}
      >
        {Works.work.map((work: Work, index: number) => {
          // Auto-detect media type: prioritize webm videos, then support jpg, png, svg, gif
          const mediaSrc = work.thumbnail || "";
          const lowerSrc = mediaSrc.toLowerCase();
          let mediaType: "video" | "image" | undefined;

          if (lowerSrc.endsWith(".webm")) {
            mediaType = "video";
          } else if (lowerSrc.match(/\.(jpg|jpeg|png|svg|gif)$/)) {
            mediaType = "image";
          } else {
            // Default to image if extension is unknown
            mediaType = "image";
          }

          return (
            <MotionDiv
              key={index}
              variants={fadeInUpSlower}
              className="h-full"
            >
              <WorkCard
                title={work.title}
                description={work.description}
                mediaSrc={mediaSrc}
                mediaType={mediaType}
                href={work.url}
                thumbnailFit={work.thumbnailFit}
              />
            </MotionDiv>
          );
        })}
      </MotionDiv>
    </Stack>
  );
};

export default memo(FeaturedWorksSection);
