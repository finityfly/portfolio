import {
  Stack,
  Heading,
  Text,
  Container,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  letterSpace,
  SPRING_PHYSICS,
} from "@/config/animations";

const introGroup = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...SPRING_PHYSICS,
      delay: 0.4,
    },
  },
};

const Profile = () => {
  const MotionHeading = motion(Heading);
  const MotionStack = motion(Stack);

  return (
    <Container p={0} m={0} maxW="100%">
      <MotionStack spacing={7} w="100%">
        <MotionHeading
          as="h1"
          size="2xl"
          initial="initial"
          animate="animate"
          variants={letterSpace}
          fontFamily="name"
          lineHeight="1.2"
          color="heading"
        >
          Daniel Lu
        </MotionHeading>

        <MotionStack
          spacing={7}
          initial="initial"
          animate="animate"
          variants={introGroup}
        >
          <Text
            fontSize="md"
            fontWeight="normal"
            color="body"
            maxW="38rem"
          >
            Computer science student at{" "}
            <Link
              className="linkUnderline inlineAccent"
              href="https://carleton.ca"
              target="_blank"
              rel="noreferrer"
              variant="emphasis"
              fontWeight="medium"
            >
              Carleton University
            </Link>
            , focused on practical NLP systems and low-latency inference.
          </Text>

          <Text
            fontSize="md"
            fontWeight="normal"
            color="body"
            maxW="38rem"
          >
            In my free time, I contribute to the{" "}
            <Link
              className="linkUnderline inlineAccent"
              href="https://huggingface.co"
              target="_blank"
              rel="noreferrer"
              variant="emphasis"
              fontWeight="medium"
            >
              Hugging Face
            </Link>
            {" "}ecosystem, specifically refining transformer models.
          </Text>
        </MotionStack>
      </MotionStack>
    </Container>
  );
};

export default Profile;
