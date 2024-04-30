import { memo } from "react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@chakra-ui/react";
import Detail from "./Detail";
import SkillSetModal from "./SkillSetModal"; // Import the SkillSetModal component

const AboutSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Detail onOpen={onOpen} />
      <SkillSetModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default memo(AboutSection);
