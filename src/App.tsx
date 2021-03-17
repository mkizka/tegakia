import React, { useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { emptyPage } from "./pages";
import { useNote } from "./useNote";
import Menu from "./Menu";
import Canvas from "./Canvas";

const App = () => {
  const note = useNote([emptyPage()]);
  const isDrawing = useRef(false);

  return (
    <ChakraProvider resetCSS>
      <Menu note={note} onPageChanged={() => (isDrawing.current = false)} />
      <Canvas note={note} isDrawing={isDrawing} />
    </ChakraProvider>
  );
};

export default App;
