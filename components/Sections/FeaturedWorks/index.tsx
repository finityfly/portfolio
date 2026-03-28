"use client";

import { memo } from "react";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import WorkCard from "./WorkCard";
import { fadeInUpSlower, galleryStagger } from "config/animations";
import { Work, Works } from "config/works";

const MotionDiv = motion.div;
function FeaturedWorksSection() {
  return (
    <Stack
      width="100%"
      height="100%"
      spacing={3}
    >
      <Stack spacing={3}>
        <Heading
          size="xl"
          fontFamily="name"
          color="heading"
          letterSpacing="0.03em"
          textTransform="lowercase"
        >
          selected works
        </Heading>
        <Text variant="description" maxW="42rem" textTransform="lowercase">
          More cool stuff on the way, but here are some highlights for now!
        </Text>
      </Stack>
      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        initial="initial"
        animate="animate"
        variants={galleryStagger}
      >
        {Works.work.map((work: Work) => (
          <MotionDiv
            key={work.title}
            variants={fadeInUpSlower}
            className="h-full"
          >
            <WorkCard
              title={work.title}
              description={work.description}
              mediaSrc={work.thumbnail || ""}
              href={work.url}
              thumbnailFit={work.thumbnailFit}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </Stack>
  );
}

export default memo(FeaturedWorksSection);
