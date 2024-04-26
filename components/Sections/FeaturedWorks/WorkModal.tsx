"use client";

/* eslint-disable react/no-multi-comp */
import { useState } from "react";
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
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./styles.module.css";
import { Work, Works } from "config/works";

type IWorkModal = {
  isOpen: boolean;
  onClose(): void;
  title: string;
};

const WorkModal = ({ isOpen, onClose, title }: IWorkModal) => {
  const selectedWork: Work | undefined = Works.work.find(
    (work) => work.title === title
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return selectedWork?.src?.length ? selectedWork.src.length - 1 : 0;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === (selectedWork?.src?.length ?? 0) - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.workModal}>
          {selectedWork && (
            <Box>
              <Flex justifyContent="space-between" mb={4} fontWeight="bold">
                <Text>{selectedWork.date}</Text>
                <Text>{selectedWork.location}</Text>
              </Flex>
              <ul>
                {selectedWork.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
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
              <Text mb={4} fontWeight="bold">
                Pictures:
              </Text>
              <Box position="relative" overflow="hidden">
                <motion.div
                  style={{
                    display: "flex",
                    width: `${selectedWork.src.length * 100}%`,
                    marginLeft: `-${currentImageIndex * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  {selectedWork.src.map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      alt={`Picture ${index + 1}`}
                      maxH="400px"
                      width="100%"
                      objectFit="contain"
                      flexShrink={0}
                    />
                  ))}
                </motion.div>
                <IconButton
                  icon={<FaChevronLeft />}
                  aria-label="Previous"
                  variant="ghost"
                  position="absolute"
                  left={0}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={goToPreviousImage}
                  isDisabled={selectedWork.src.length <= 1}
                />
                <IconButton
                  icon={<FaChevronRight />}
                  aria-label="Next"
                  variant="ghost"
                  position="absolute"
                  right={0}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={goToNextImage}
                  isDisabled={selectedWork.src.length <= 1}
                />
              </Box>
              <Text mb={4} fontWeight="bold">
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
