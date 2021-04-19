import React from "react";
import { Box, Code } from "@chakra-ui/react";

import { Note } from "./useNote";

type Props = {
  note: Note;
};

const Debug: React.VFC<Props> = ({ note }) => {
  const { isDrawing, currentPage } = note;

  return (
    <Box position="fixed" w="10vw" left="0" top="0">
      <pre>
        <Code>
          {JSON.stringify(
            {
              isDrawing,
              currentPage: {
                lines: currentPage.lines.map((line, i) => `line_${i}`),
              },
            },
            null,
            2
          )}
        </Code>
      </pre>
    </Box>
  );
};

export default Debug;
