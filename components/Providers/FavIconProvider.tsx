import React from "react";
import { useColorMode } from "@chakra-ui/react";
import Head from "next/head";

const FavIconProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={colorMode === "dark" ? "/favicon_dark.ico" : "/favicon.ico"}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export default FavIconProvider;
