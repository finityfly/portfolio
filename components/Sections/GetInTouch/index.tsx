
import { memo } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Link,
  useToast,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { SocialMedias } from "@/data/profile";

const GetInTouch = () => {
  const toast = useToast();
  const toastBg = useColorModeValue("#ECF2E5", "#141A12");
  const toastBorder = useColorModeValue("#D4DCCE", "#263220");
  const toastText = useColorModeValue("#1B2219", "#E8EFE2");
  const toastAccent = useColorModeValue("#5A7D59", "#AFC98D");
  const socialBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const socialHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

  return (
    <Stack
      width="100%"
      height="100%"
      spacing={{ base: 8, md: 10 }}
      as="section"
      position="relative"
    >
      <Heading
        size="xl"
        fontFamily="name"
        position="relative"
        zIndex={20}
        color="heading"
        textTransform="lowercase"
      >
        get in touch
      </Heading>
      <Text variant="description" maxW="40rem">
        Shoot me an email at{" "}
        <Link
          as="span"
          cursor="pointer"
          onClick={() => {
            navigator.clipboard.writeText("daniellu@cmail.carleton.ca");
            toast({
              position: "top",
              duration: 2600,
              render: ({ onClose }) => (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="12px"
                  border="1px solid"
                  borderColor={toastBorder}
                  backgroundColor={toastBg}
                  color={toastText}
                  boxShadow="0 10px 30px rgba(0, 0, 0, 0.25)"
                  minW={{ base: "240px", sm: "280px" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxSize="32px"
                    borderRadius="10px"
                    backgroundColor={toastAccent}
                    color="black"
                  >
                    <CheckIcon boxSize={4} />
                  </Box>
                  <Text fontSize="sm" fontWeight="medium" letterSpacing="0.01em">
                    Email copied!
                  </Text>
                  <Box ml="auto">
                    <IconButton
                      aria-label="Close toast"
                      size="xs"
                      variant="ghost"
                      icon={<CloseIcon boxSize={2.5} />}
                      onClick={onClose}
                    />
                  </Box>
                </Box>
              ),
            });
          }}
          variant="emphasis"
          className="linkUnderline"
        >
          daniellu@cmail.carleton.ca
        </Link>{" "}
        or connect through one of the links below. Always happy to connect with interesting people working on interesting problems. If something here resonates, I'd love to talk.
      </Text>
      <HStack spacing={4} flexWrap="wrap" align="center">
        {SocialMedias.map((socMedia) => (
          <Link
            key={socMedia.label}
            aria-label={socMedia.label}
            rel="noreferrer"
            href={socMedia.href}
            target="_blank"
            _focus={{ boxShadow: "none" }}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <HStack
              spacing={2.5}
              px={5}
              py={3}
              borderRadius="10px"
              border="1px solid"
              borderColor={socialBorder}
              color="description"
              transition="all 0.2s"
              _hover={{
                borderColor: "sage.500",
                color: "sage.500",
                bg: socialHoverBg,
              }}
            >
              <Box as={socMedia.icon} boxSize={5} />
              <Text fontSize="sm" fontWeight="medium" letterSpacing="0.04em">
                {socMedia.label}
              </Text>
            </HStack>
          </Link>
        ))}
      </HStack>
    </Stack>
  );
};

export default memo(GetInTouch);
