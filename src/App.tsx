import React, { useRef } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

import { useNote } from "./useNote";
import Menu from "./Menu";
import Canvas from "./Canvas";
import Debug from "./Debug";

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
      {import.meta.env.DEV && <Debug note={note} />}
    </ChakraProvider>
  );
};

export default App;
