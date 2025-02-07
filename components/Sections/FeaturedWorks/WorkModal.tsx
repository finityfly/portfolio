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
  Button,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import getYouTubeID from "get-youtube-id";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Work, Works } from "config/works";
import {
  fadeInUp,
  fadeInUpSlower,
  simpleOpacity,
  stagger,
} from "config/animations";

const MotionButton = motion(Button);

type IWorkModal = {
  isOpen: boolean;
  onClose(): void;
  title: string;
};

const WorkModal = ({ isOpen, onClose, title }: IWorkModal) => {
  const emphasis = useColorModeValue("#319795", "#9decf9");
  const hoverBoxShadowColor = useColorModeValue("#319795", "#9decf9");
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

  const renderTechnologies = () => {
    const rows = [];
    const technologies = selectedWork?.technologies || [];
    for (let i = 0; i < technologies.length; i += 4) {
      const rowItems = technologies.slice(i, i + 4);
      rows.push(
        <Flex justifyContent={"space-evenly"} gap={2} key={i}>
          {rowItems.map((Icon, index) => (
            <Box
              textAlign="center"
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Icon size="40px" />
              <Text mt={2}>{Icon.name.slice(2)}</Text>
            </Box>
          ))}
        </Flex>
      );
    }
    return rows;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        as={motion.div}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        maxW="60vw"
      >
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
              {/* Description Section */}
              <motion.div variants={fadeInUpSlower}>
                <Flex justifyContent="space-between" mb={4} fontWeight="bold">
                  <Text>{selectedWork.date}</Text>
                  <Text>{selectedWork.location}</Text>
                </Flex>
              </motion.div>
              <motion.div variants={fadeInUpSlower}>
                <Flex ms={4}>
                  <ul>{formattedPoints}</ul>
                </Flex>
              </motion.div>

              {/* Buttons Section */}
              <motion.div variants={fadeInUpSlower}>
                <Flex justifyContent="center" gap={4} my={4}>
                  <MotionButton
                    variant="outline"
                    fontWeight="light"
                    fontSize="md"
                    borderRadius="5px"
                    size="md"
                    as="a"
                    href={selectedWork.url1}
                    rel="noreferrer"
                    target="_blank"
                    whileHover={{
                      boxShadow: `0px 0px 6px 0px ${hoverBoxShadowColor}`,
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    View on GitHub
                  </MotionButton>
                  <MotionButton
                    variant="outline"
                    fontWeight="light"
                    fontSize="md"
                    borderRadius="5px"
                    size="md"
                    as="a"
                    href={selectedWork.url2}
                    rel="noreferrer"
                    target="_blank"
                    whileHover={{
                      boxShadow: `0px 0px 6px 0px ${hoverBoxShadowColor}`,
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    Visit Website
                  </MotionButton>
                </Flex>
              </motion.div>

              <Divider
                borderColor="#A6A6A6"
                width="100%"
                alignSelf={"center"}
                mb={4}
              />

              {/* Media Section */}
              <motion.div variants={fadeInUpSlower}>
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
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
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
                    <SwiperSlide key={index}>
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
              </motion.div>

              <Divider
                borderColor="#A6A6A6"
                width="100%"
                alignSelf={"center"}
                mt={4}
              />

              {/* Technologies Section */}
              <motion.div variants={fadeInUpSlower}>
                <Text my={4} fontWeight="bold">
                  Technologies:
                </Text>
                <Box>{renderTechnologies()}</Box>
              </motion.div>
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
