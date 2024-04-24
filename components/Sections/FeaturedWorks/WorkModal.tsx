/* eslint-disable react/no-multi-comp */
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useColorModeValue,
  Divider,
  Text,
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import { Works } from "config/works";

type IWorkModal = {
  isOpen: boolean;
  onClose(): void;
};

const WorkModal = ({ isOpen, onClose }: IWorkModal) => {
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Work in Progress!</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.workModal}></ModalBody>
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
