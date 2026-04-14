import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "config/theme";
import FavIconProvider from "components/Misc/FavIconProvider";
import SmoothScroll from "components/Misc/SmoothScroll";
import NavSfxProvider from "components/Misc/NavSfxProvider";

function DLSite({ Component, pageProps }: AppProps) {
  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        <ChakraProvider theme={theme}>
          <FavIconProvider>
            <NavSfxProvider>
              <Component {...pageProps} />
            </NavSfxProvider>
          </FavIconProvider>
        </ChakraProvider>
      </AnimatePresence>
    </SmoothScroll>
  );
}
export default DLSite;
