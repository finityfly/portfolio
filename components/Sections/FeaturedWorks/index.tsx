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
import FeaturedCard from "./FeaturedCard";
import { fadeInUpSlower, galleryStagger } from "config/animations";
import { mobileBreakpointsMap } from "config/theme";
import { Work, Works } from "config/works";

const MotionGrid = motion(Grid);
const MotionGridItem = motion(GridItem);
const WorkModal = dynamic(() => import("./WorkModal"));

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
          Some of my works.
        </Heading>
        <Text variant="description">
          Check out some of the projects I made for fun, for clients, or for
          hackathons.
        </Text>

        <MotionGrid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={{ base: 5, md: 6 }}
          variants={galleryStagger}
        >
          {Works.work.map((work: Work, index: number) => (
            <MotionGridItem key={index} colSpan={6} variants={fadeInUpSlower}>
              <FeaturedCard
                idx={index + 1}
                title={work.title}
                src={work.src[0]}
                onOpen={() => openModal(work.title)}
                description={work.points[0]}
                height={{ base: "130px", md: "225px", "2xl": "300px" }}
                url1={work.url1}
                url2={work.url2}
                objectPosition="right 20%"
                isMobile={isMobile}
              />
            </MotionGridItem>
          ))}
          {/* <MotionGridItem colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={1}
              title="Walk in the Park"
              src="/works/walk_thumbnail.png"
              onOpen={() => openModal(work.title)}
              description="A gamified mobile application designed to foster empathy, understanding, and cultural awareness. The project utilizes React Native for cross-platform capability, AI-driven content curation, and a Python-based server infrastructure"
              height={{ base: "130px", md: "225px", "2xl": "300px" }}
              ctaUrl="https://github.com/EdwinNgui/Walk-in-the-Park"
              secondUrl="https://devpost.com/software/walk-in-the-park"
              objectPosition="right 20%"
              isMobile={isMobile}
            />
          </MotionGridItem>

          <MotionGridItem colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={2}
              title="TRACY: Tennis Real-time Analysis Coaching Systems"
              description="A full-stack web application that provides real-time analysis and coaching for tennis players. The React application uses computer vision to track the player's movements and provides feedback on their performance."
              src="/works/tracy_thumbnail.png"
              onOpen={() => openModal(work.title)}
              height={{ base: "130px", md: "225px", "2xl": "300px" }}
              ctaUrl="https://github.com/EdwinNgui/TRACY"
              secondUrl="https://devpost.com/software/tracy-dm41vu"
              isMobile={isMobile}
            />
          </MotionGridItem>

          <MotionGridItem colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={3}
              title="Melodica"
              description="A modern web tool for musicians that leverages AI-powered technologies to separate instrument stems and provide other valuable utilities. The project uses React in combination with p5.js for the front-end and Flask for the back-end."
              src="/works/melodica_thumbnail.png"
              onOpen={() => openModal(work.title)}
              height={{ base: "130px", md: "225px", "2xl": "300px" }}
              ctaUrl="https://github.com/FinityFly/melodica"
              secondUrl="https://devpost.com/software/melodica-y0267b"
              objectPosition="right 20%"
              isMobile={isMobile}
            />
          </MotionGridItem>

          <MotionGridItem colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={4}
              title="Automatic Speech Recognition Neural Network Feature Extraction Analysis"
              description="Over the course of 6 months, I created and trained a bidirectional GRU network using Tensorflow to generate test data for my research paper on speech feature extraction algorithms."
              src="/works/paper.png"
              onOpen={() => openModal(work.title)}
              height={{ base: "130px", md: "225px", "2xl": "300px" }}
              ctaUrl="https://github.com/FinityFly/SpeechRecognition"
              secondUrl="https://www.academia.edu/108988755/Investigating_the_Impact_of_Various_Feature_Extraction_Algorithms_on_Performance_in_Automatic_Speech_Recognition_Systems"
              isMobile={isMobile}
            />
          </MotionGridItem>

          <MotionGridItem colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={5}
              title="Mimeals"
              description="Lead the development of a meal-planning web application that allows users to easily plan their meals for the week and easily organize a crucial aspect of everyday life"
              src="/works/mimeals_thumbnail.jpeg"
              onOpen={() => openModal(work.title)}
              height={{ base: "130px", md: "225px", "2xl": "300px" }}
              ctaUrl="https://github.com/FinityFly/mimeals"
              secondUrl="http://mimeals.azurewebsites.net"
              isMobile={isMobile}
            />
          </MotionGridItem> */}
        </MotionGrid>
      </Stack>
      <WorkModal isOpen={isOpen} onClose={onClose} title={selectedWork} />
    </>
  );
};

export default memo(FeaturedWorksSection);
