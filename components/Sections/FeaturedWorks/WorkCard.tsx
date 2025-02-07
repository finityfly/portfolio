import { Box, Image, Text, Stack, Divider, Button, useColorModeValue, Flex, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ThemeMode } from "config/theme";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionButton = motion(Button);

type ProfileCardProps = {
  index: number;
  title: string;
  location: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
  url1: string;
  url2: string;
  isMobile?: boolean;
  onOpen: () => void;
};

const WorkCard = ({ index, title, location, description, imageSrc, logoSrc, url1, url2, isMobile, onOpen }: ProfileCardProps) => {
  const { colorMode } = useColorMode();
  const emphasis = useColorModeValue("#319795", "#9decf9");
  const flexDirection = index % 2 === 0 ? { base: "column", md: "row" } : { base: "column", md: "row-reverse" };

  const boxShadowColor = colorMode === ThemeMode.Dark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";
  const hoverBoxShadowColor = colorMode === ThemeMode.Dark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)";

  return (
    <MotionBox
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      boxShadow={`0px 2px 6px 0px ${boxShadowColor}`}
      overflow="hidden"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      width="95%"
      ml="16px"
      maxHeight="400px"
      whileHover={{ 
        boxShadow: `0px 3px 12px 0px ${hoverBoxShadowColor}`, 
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Flex direction={flexDirection}>
        <Box flex="1" maxW={{ base: "100%", md: "50%" }}>
          <Image
            src={imageSrc}
            alt={title}
            objectFit="cover"
            height="100%"
            width="100%"
            // whileHover={{ scale: 1.1 }}
            // transition={{ duration: 0.3 }}
          />
        </Box>
        <Box flex="1" p={5} maxW={{ base: "100%", md: "50%" }}>
          <Stack spacing={2}>
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="xl">
                {title}
              </Text>
              <Box
                as="span"
                borderRadius="full"
                overflow="hidden"
                width="40px"
                height="40px"
              >
                <Image src={logoSrc} alt={`${title} logo`} objectFit="cover" />
              </Box>
            </Flex>
            <Text fontSize="sm" color={emphasis}>
              {location}
            </Text>
            <Divider borderColor="gray.200" />
            <Text fontSize="sm" color="gray.600">
              {description}
            </Text>
          </Stack>
          <MotionButton
            mt={4}
            colorScheme="teal"
            variant="outline"
            width="full"
            onClick={onOpen}
            whileHover={{ 
              boxShadow: `0px 0px 6px 0px ${hoverBoxShadowColor}`, 
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            More Info
          </MotionButton>
          <Flex mt={4} gap={2}>
            <MotionButton
              variant="outline"
              fontWeight="light"
              fontSize="sm"
              borderRadius="5px"
              size="sm"
              as="a"
              href={url1}
              rel="noreferrer"
              target="_blank"
              width="50%"
              whileHover={{ 
                boxShadow: `0px 0px 6px 0px ${hoverBoxShadowColor}`, 
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              GitHub
            </MotionButton>
            <MotionButton
              variant="outline"
              fontWeight="light"
              fontSize="sm"
              borderRadius="5px"
              size="sm"
              as="a"
              href={url2}
              rel="noreferrer"
              target="_blank"
              width="50%"
              whileHover={{ 
                boxShadow: `0px 0px 6px 0px ${hoverBoxShadowColor}`, 
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              External
            </MotionButton>
          </Flex>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default WorkCard;