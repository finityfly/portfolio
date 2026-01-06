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
  Tooltip,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  SiPython,
  SiJavascript,
  SiTensorflow,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiAmazonaws,
  SiCodeforces,
} from "react-icons/si";
import { LuCupSoda } from "react-icons/lu";
import { IoMdOpen } from "react-icons/io";

type ISkillSetModal = {
  onOpen(): void;
};

const Detail = ({ onOpen }: ISkillSetModal) => {
  const emphasis = useColorModeValue("teal.500", "cyan.200");
  const currentYear = new Date().getFullYear();
  const professionalYears = currentYear - 2020;

  return (
    <Stack
      width={{ base: "100%", lg: "70%" }}
      spacing={{ base: 6, xl: 8 }}
      as="section"
      backdropFilter="blur(3px)"
      borderRadius="lg"
    >
      <Heading
        as="h4"
        size="2xl"
        letterSpacing={1.8}
        style={{
          fontVariantCaps: "small-caps",
        }}
      >
        What i do.
      </Heading>
      <Text variant="description">
        I`ve been programming professionally for {professionalYears} years now
        and currently working as a <b>Software Engineer</b> that specializes in{" "}
        <b>full-stack software development</b>,{" "}
        {/* eslint-disable-next-line prettier/prettier */}
        <Tooltip
          label="AWS, Azure"
          aria-label="cloud engineering"
          hasArrow
        >
          <Text as="span" variant="emphasis">
            <b>cloud engineering</b>
          </Text>
        </Tooltip>
        {/* eslint-disable-next-line prettier/prettier */}
        , and{" "}
        <Tooltip
          label="Interested in federated learning, transfer learning, computer vision"
          aria-label="machine learning"
          hasArrow
        >
          <Text as="span" variant="emphasis">
            <b>machine learning</b>
          </Text>
        </Tooltip>
        !
        <br /> <br />
        Here are few technologies that are the cup of my tea{" "}
        <Icon as={LuCupSoda} color={emphasis} />.
      </Text>

      <SimpleGrid columns={2} spacing={4}>
        <List spacing={3}>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiPython} color={emphasis} fontSize="2em" />
            Python
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiCplusplus} color={emphasis} fontSize="2em" />
            C/C++
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiJavascript} color={emphasis} fontSize="2em" />
            Javascript
          </ListItem>

          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiNodedotjs} color={emphasis} fontSize="2em" />
            Node
          </ListItem>
        </List>
        <List spacing={3}>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiReact} color={emphasis} fontSize="2em" />
            React/NextJS
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiTensorflow} color={emphasis} fontSize="2em" />
            Tensorflow
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiAmazonaws} color={emphasis} fontSize="2em" />
            AWS
          </ListItem>
          <ListItem fontSize="small" display="flex" alignItems="center">
            <ListIcon as={SiCodeforces} color={emphasis} fontSize="2em" />
            Data Structures and Algorithms
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
            See my full arsenal <Icon as={IoMdOpen} />
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  );
};

export default memo(Detail);
