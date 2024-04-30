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
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { Skill, Skills, splitSkills } from "config/skills";

type ISkillSetModal = {
  isOpen: boolean;
  onClose(): void;
};

const SkillList = ({
  title,
  columns,
}: {
  title: string;
  columns: Skill[][];
}) => {
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  const [colOne, colTwo = []] = columns;
  return (
    <>
      <Heading as="div" size="sm" paddingBottom={1} variant="description">
        {title}
      </Heading>
      <Divider marginBottom={4} />
      <SimpleGrid columns={2} spacing={4} paddingBottom={6}>
        <List spacing={3}>
          {colOne.map((item) => (
            <ListItem
              key={item.name}
              fontSize="small"
              display="flex"
              alignItems="center"
            >
              <ListIcon as={item.icon} color={emphasis} fontSize="2em" />
              {item.name}
            </ListItem>
          ))}
        </List>
        <List spacing={3}>
          {colTwo.map((item) => (
            <ListItem
              key={item.name}
              fontSize="small"
              display="flex"
              alignItems="center"
            >
              <ListIcon as={item.icon} color={emphasis} fontSize="2em" />
              {item.name}
            </ListItem>
          ))}
        </List>
      </SimpleGrid>
    </>
  );
};

const SkillSetModal = ({ isOpen, onClose }: ISkillSetModal) => {
  const programmingCols = splitSkills(Skills.programming);
  const webCols = splitSkills(Skills.web);
  const flCols = splitSkills(Skills.frameworks_libraries);
  const cloudCols = splitSkills(Skills.cloud);
  const toolCols = splitSkills(Skills.tools);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Full Skill Set List</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.skillModal}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SkillList title="Backend Centric" columns={programmingCols} />
            <SkillList title="Frontend Centric" columns={webCols} />
            <SkillList title="Frameworks and Libraries" columns={flCols} />
            <SkillList title="Cloud and Databases" columns={cloudCols} />
            <SkillList title="Tools and Utility" columns={toolCols} />
          </motion.div>
        </ModalBody>
        <ModalFooter>
          <Text fontSize="x-small">*Some micro frameworks not included </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SkillSetModal;
