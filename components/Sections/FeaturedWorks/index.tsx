"use client";

import { memo, useState } from "react";
import {
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";
import WorkCard from "./WorkCard";
import WorkModal from "./WorkModal";
import { fadeInUpSlower, galleryStagger } from "config/animations";
import { mobileBreakpointsMap } from "config/theme";
import { Work, Works } from "config/works";

const MotionDiv = motion.div;
// const WorkModal = dynamic(() => import("./WorkModal"));

const FeaturedWorksSection = () => {
  const isMobile = useBreakpointValue(mobileBreakpointsMap);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedWork, setSelectedWork] = useState<string>("");

  const openModal = (title: string) => {
    setSelectedWork(title);
    onOpen();
  };

  return (
    <>
      <Stack
        width={{ base: "99%", lg: "60%", xl: "75%" }}
        height="100%"
        spacing={{ base: 6, xl: 8 }}
      >
        <Heading
          size="2xl"
          style={{
            fontVariantCaps: "small-caps",
          }}
        >
          What I&apos;ve been up to
        </Heading>
        {/* <Text variant="description">
          Check out some of the projects I made for fun, for clients, or for
          hackathons.
        </Text> */}
        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={galleryStagger}
        >
          {Works.work.map((work: Work, index: number) => (
            <MotionDiv key={index} variants={fadeInUpSlower}>
              <WorkCard
                title={work.title}
                subtitle={work.location}
                description={work.points[0]}
                mediaSrc={work.src[0]}
                mediaType={work.src[0]?.endsWith(".gif") ? "gif" : "image"}
                href={work.url2}
              />
            </MotionDiv>
          ))}
        </MotionDiv>
      </Stack>
      <WorkModal isOpen={isOpen} onClose={onClose} title={selectedWork} />
    </>
  );
};

export default memo(FeaturedWorksSection);
