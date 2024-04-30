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
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import getYouTubeID from "get-youtube-id";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
      <ModalContent maxW="60vw">
        <ModalHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize={{ base: "lg", md: "3xl", "2xl": "4xl" }}
          fontWeight="bold"
          letterSpacing={1}
          textTransform="uppercase"
          color={emphasis}
          mx={4}
          mt={3}
        >
          <span>{title}</span>
          {selectedWork && (
            <Image
              src={selectedWork.icon}
              maxHeight="50px"
              alt={title}
              marginEnd="25px"
            />
          )}
        </ModalHeader>
        <Divider borderColor="#A6A6A6" width="90%" alignSelf={"center"} />
        <ModalCloseButton />
        <ModalBody className={styles.workModal}>
          {selectedWork && (
            <Box>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Flex justifyContent="space-between" mb={4} fontWeight="bold">
                  <Text>{selectedWork.date}</Text>
                  <Text>{selectedWork.location}</Text>
                </Flex>
                <Flex ms={4}>
                  <ul>{formattedPoints}</ul>
                </Flex>
              </motion.div>
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
              <Divider
                borderColor="#A6A6A6"
                width="100%"
                alignSelf={"center"}
                mb={4}
              />
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
                style={{
                  "--swiper-navigation-color": emphasis,
                  "--swiper-pagination-color": emphasis,
                }}
              >
                {selectedWork.video != undefined && (
                  <SwiperSlide>
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
                  </SwiperSlide>
                )}
                {selectedWork.src.map((src, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <SwiperSlide>
                    <Image
                      src={src}
                      alt={`Picture ${index + 1}`}
                      maxH="400px"
                      width="100%"
                      objectFit="contain"
                      flexShrink={0}
                    />
                  </SwiperSlide>
                ))}
                <div className="slider-controller">
                  <div
                    className="swiper-button-prev slider-arrow"
                    style={{ color: emphasis }}
                  ></div>
                  <div
                    className="swiper-button-next slider-arrow"
                    style={{ color: emphasis }}
                  ></div>
                  <div
                    className="swiper-pagination"
                    style={{ color: emphasis }}
                  ></div>
                </div>
              </Swiper>
              <Divider
                borderColor="#A6A6A6"
                width="100%"
                alignSelf={"center"}
                mt={4}
              />
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
