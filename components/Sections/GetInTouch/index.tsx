"use client";

import { Fragment, memo } from "react";
import {
  Heading,
  Text,
  Stack,
  Link,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { SocialMedias } from "config/sidebar";

const GetInTouch = () => {
  const toast = useToast();

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
        shoot me an email at{" "}
        <Link
          as="span"
          cursor="pointer"
          onClick={() => {
            navigator.clipboard.writeText("daniellu@cmail.carleton.ca");
            toast({
              title: "Email copied!",
              status: "success",
              duration: 3000,
              isClosable: true,
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
