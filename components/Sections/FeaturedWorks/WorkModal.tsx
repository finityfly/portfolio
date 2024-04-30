"use client";

/* eslint-disable react/no-multi-comp */
import { useState, Component } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Grid,
  GridItem,
  Image,
  Button,
  useColorModeValue,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import getYouTubeID from "get-youtube-id";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import styles from "./styles.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Work, Works } from "config/works";

type IWorkModal = {
  isOpen: boolean;
  onClose(): void;
  title: string;
};

const WorkModal = ({ isOpen, onClose, title }: IWorkModal) => {
  const emphasis = useColorModeValue("#319795", "#9decf9");
  const selectedWork: Work | undefined = Works.work.find(
    (work) => work.title === title
  );

  const applyBoldFormatting = (text: string) => {
    const boldRegex = /<b>(.*?)<\/b>/g;
    const formattedText = text.replace(
      boldRegex,
      (_: string, content: string) =>
        `<span style="font-weight: bold; color: ${emphasis}">${content}</span>`
    );
    return formattedText;
  };

  const formattedPoints = selectedWork?.points.map((point, index) => (
    <li
      key={index}
      dangerouslySetInnerHTML={{ __html: applyBoldFormatting(point) }}
    />
  ));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxW="40vw">
        <ModalHeader
          fontSize={{ base: "md", md: "large", "2xl": "xx-large" }}
          fontWeight="bold"
          letterSpacing={1}
          textTransform="uppercase"
          color={emphasis}
          mx={4}
          mt={3}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.workModal}>
          {selectedWork && (
            <Box>
              <Flex justifyContent="space-between" mb={4} fontWeight="bold">
                <Text>{selectedWork.date}</Text>
                <Text>{selectedWork.location}</Text>
              </Flex>
              <Flex ms={4}>
                <ul>{formattedPoints}</ul>
              </Flex>
              <Box textAlign="center">
                <Button
                  as="a"
                  href={selectedWork.url1}
                  target="_blank"
                  rel="noreferrer"
                  colorScheme="teal"
                  mx={4}
                  my={4}
                >
                  View on GitHub
                </Button>
                <Button
                  as="a"
                  href={selectedWork.url2}
                  target="_blank"
                  rel="noreferrer"
                  colorScheme="teal"
                  mx={4}
                  my={4}
                >
                  Visit Website
                </Button>
              </Box>
              {/* i have no idea how to fix the red squigglies for the next few lines */}
              {/* eslint-disable */}
              <Carousel showThumbs={false} autoPlay={true}>
                {selectedWork.video && (
                  <div>
                    <iframe
                      width="100%"
                      height="400px"
                      src={`https://www.youtube.com/embed/${getYouTubeID(
                        selectedWork.video
                      )}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {selectedWork.src.map((src, index) => (
                  <div key={index}>
                    <Image
                      src={src}
                      alt={`Picture ${index + 1}`}
                      maxH="400px"
                      width="100%"
                      objectFit="contain"
                      flexShrink={0}
                    />
                  </div>
                ))}
              </Carousel>
              {/* eslint-enable */}
              <Text my={4} fontWeight="bold">
                Technologies:
              </Text>
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {selectedWork.technologies.map((Icon, index) => (
                  <GridItem key={index}>
                    <Icon size="40px" />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Text fontSize="x-small">
            *There will be stuff here very very soon don&apos;t worry
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WorkModal;
