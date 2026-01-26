import { memo, useState, useEffect } from "react";
import {
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
  SimpleGrid,
  Box,
  Stack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import {
  SiPython,
  SiCplusplus,
  SiAmazonaws,
  SiDocker,
  SiRust,
  SiPytorch,
  SiNextdotjs,
} from "react-icons/si";
import { IoMdOpen } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion, Variants } from "framer-motion";
import { Works } from "config/works";

type ISkillSetModal = {
  onOpen(): void;
};

const scrollIndicatorVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: "easeOut",
    },
  },
};

const arrowBounceVariants: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.3,
    },
  },
};

const typewriterVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1.2,
    },
  },
};

const Detail = ({ onOpen }: ISkillSetModal) => {
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  const projectCount = Works.work.length;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const worksSection = document.getElementById("works");
      if (worksSection) {
        const rect = worksSection.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToWorks = () => {
    const worksSection = document.getElementById("works");
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box width={{ base: "100%", md: "100%", lg: "70%" }}>
      <Stack spacing={{ base: 6, md: 4, lg: 6 }}>
        <Heading
          as="h4"
          size="2xl"
          letterSpacing={1.8}
          style={{
            fontVariantCaps: "small-caps",
          }}
        >
          I ship neat things.
        </Heading>
        <Text variant="description" fontSize="lg">
          Check out some of the stuff I&apos;ve been working on!
          {/* I engineer high-performance distributed systems and scalable full-stack
        applications. My focus is on{" "}
        <Text as="span" variant="emphasis">
          velocity
        </Text>
        ,{" "}
        <Text as="span" variant="emphasis">
          robustness
        </Text>
        , and{" "}
        <Text as="span" variant="emphasis">
          shipping code
        </Text>{" "}
        that matters. */}
        </Text>

        <Box mt={4}>
          <motion.div
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            variants={scrollIndicatorVariants}
          >
            <Flex
              direction="column"
              align="flex-start"
              gap={3}
              cursor="pointer"
              onClick={handleScrollToWorks}
              _hover={{
                "& > *": {
                  opacity: 0.8,
                },
              }}
              transition="all 0.2s"
            >
              <motion.div variants={typewriterVariants}>
                <Text
                  variant="description"
                  fontSize="sm"
                  fontWeight="medium"
                  color={emphasis}
                  letterSpacing="0.5px"
                >
                  {projectCount} {projectCount === 1 ? "project" : "projects"}{" "}
                  waiting below ↓
                </Text>
              </motion.div>
              <motion.div variants={arrowBounceVariants} animate="animate">
                <Flex align="center" gap={2} color={emphasis}>
                  <Icon as={RiArrowDownSLine} w={6} h={6} />
                  <Icon as={RiArrowDownSLine} w={5} h={5} opacity={0.7} />
                  <Icon as={RiArrowDownSLine} w={4} h={4} opacity={0.5} />
                </Flex>
              </motion.div>
            </Flex>
          </motion.div>
        </Box>

        {/* <SimpleGrid columns={2} spacing={4}>
        <List spacing={3}>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiPython} color={emphasis} fontSize="2em" />
            Python
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiCplusplus} color={emphasis} fontSize="2em" />
            C++
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiNextdotjs} color={emphasis} fontSize="2em" />
            Next.js / React
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiRust} color={emphasis} fontSize="2em" />
            Rust
          </ListItem>
        </List>
        <List spacing={3}>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiPytorch} color={emphasis} fontSize="2em" />
            LangChain / RAG
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiAmazonaws} color={emphasis} fontSize="2em" />
            AWS & Cloud Infrastructure
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiDocker} color={emphasis} fontSize="2em" />
            Docker & Kubernetes
          </ListItem>
        </List>
        <Box>
          <Text
            as="button"
            variant="emphasis"
            fontSize="smaller"
            textAlign="left"
            onClick={onOpen}
          >
            View Full Stack <Icon as={IoMdOpen} />
          </Text>
        </Box>
      </SimpleGrid> */}
      </Stack>
    </Box>
  );
};

export default memo(Detail);
