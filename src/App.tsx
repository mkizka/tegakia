import React, { useRef } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
      body: {
        overscrollBehavior: "none",
      },
    },
  },
});

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap");
`;

const App = () => {
  const note = useNote();

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Global styles={styles} />
      <Canvas note={note} />
      <Menu note={note} />
    </ChakraProvider>
  );
};

export default App;
