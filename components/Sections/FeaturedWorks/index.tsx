"use client";

import { memo, useState } from "react";
import {
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useDisclosure } from "@chakra-ui/react";
import { IconType } from "react-icons";
import WorkCard from "./WorkCard";
import WorkModal from "./WorkModal";
import { fadeInUpSlower, galleryStagger } from "config/animations";
import { mobileBreakpointsMap } from "config/theme";
import { Work, Works } from "config/works";

const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);
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
        <MotionGrid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={{ base: 5, md: 6 }}
          variants={galleryStagger}
        >
          {Works.work.map((work: Work, index: number) => (
            <MotionGridItem key={index} colSpan={6} variants={fadeInUpSlower}>
              <WorkCard
                index={index}
                title={work.title}
                location={work.location}
                description={work.points[0]}
                imageSrc={work.src[0]}
                logoSrc={work.icon}
                url1={work.url1}
                url2={work.url2}
                isMobile={isMobile}
                onOpen={() => openModal(work.title)}
              />
            </MotionGridItem>
          ))}
        </MotionGrid>
      </Stack>
      <WorkModal isOpen={isOpen} onClose={onClose} title={selectedWork} />
    </>
  );
};

export default memo(FeaturedWorksSection);
