import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "config/theme";
import FavIconProvider from "components/Misc/FavIconProvider";
import SmoothScroll from "components/Misc/SmoothScroll";

function DLSite({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SmoothScroll>
      <AnimatePresence exitBeforeEnter>
        <ChakraProvider theme={theme}>
          <FavIconProvider>
            <Component {...pageProps} />
          </FavIconProvider>
        </ChakraProvider>
      </AnimatePresence>
    </SmoothScroll>
  );
}
export default DLSite;
