"use client";

import { Fragment, memo } from "react";
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
import { SocialMedias } from "config/profile";

const GetInTouch = () => {
  const toast = useToast();
  const toastBg = useColorModeValue("#ECF2E5", "#141A12");
  const toastBorder = useColorModeValue("#D4DCCE", "#263220");
  const toastText = useColorModeValue("#1B2219", "#E8EFE2");
  const toastAccent = useColorModeValue("#5A7D59", "#AFC98D");

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
        or connect through one of the links below.
      </Text>
      <HStack spacing={{ base: 5, md: 7 }} flexWrap="wrap" align="center">
        {SocialMedias.map((socMedia, index) => (
          <Fragment key={socMedia.label}>
            <Link
              aria-label={socMedia.label}
              rel="noreferrer"
              href={socMedia.href}
              target="_blank"
              className="linkUnderline"
              _focus={{ boxShadow: "none" }}
              fontSize="sm"
              letterSpacing="0.05em"
              variant="description"
              _hover={{ color: "sage.500", textDecoration: "none" }}
              data-nav-sfx
            >
              {socMedia.label}
            </Link>
            {index < SocialMedias.length - 1 && (
              <Text as="span" variant="description" opacity={0.8}>
                ·
              </Text>
            )}
          </Fragment>
        ))}
      </HStack>
    </Stack>
  );
};

export default memo(GetInTouch);
