import React, { useRef } from "react";
import { ChakraProvider, extendTheme, GlobalStyle } from "@chakra-ui/react";

import { emptyPage } from "./pages";
import { useNote } from "./useNote";
import Menu from "./Menu";
import Canvas from "./Canvas";
import { Global } from "@emotion/react";

const theme = extendTheme({
  fonts: {
    body: `"M PLUS 1p", sans-serif`,
  },
  styles: {
    global: {
      overscrollBehavior: "none",
    },
  },
});

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p");
`;

const App = () => {
  const note = useNote([emptyPage()]);
  const isDrawing = useRef(false);

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Global styles={styles} />
      <Menu note={note} onPageChanged={() => (isDrawing.current = false)} />
      <Canvas note={note} isDrawing={isDrawing} />
    </ChakraProvider>
  );
};

export default App;
