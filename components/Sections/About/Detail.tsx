import { memo } from "react";
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

type ISkillSetModal = {
  onOpen(): void;
};

const Detail = ({ onOpen }: ISkillSetModal) => {
  const emphasis = useColorModeValue("teal.500", "cyan.200");

  return (
    <Stack
      width={{ base: "100%", lg: "70%" }}
      spacing={{ base: 6, xl: 8 }}
      as="section"
    >
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
        I engineer high-performance distributed systems and scalable full-stack applications.
        My focus is on <Text as="span" variant="emphasis">velocity</Text>, <Text as="span" variant="emphasis">robustness</Text>, and <Text as="span" variant="emphasis">shipping code</Text> that matters.
      </Text>

      <SimpleGrid columns={2} spacing={4}>
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
        {/* <Box>
          <Text
            as="button"
            variant="emphasis"
            fontSize="smaller"
            textAlign="left"
            onClick={onOpen}
          >
            View Full Stack <Icon as={IoMdOpen} />
          </Text>
        </Box> */}
      </SimpleGrid>
    </Stack>
  );
};

export default memo(Detail);
