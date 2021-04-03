import React from "react";
import { IconButton, Icon } from "@chakra-ui/react";
import {
  BsCaretLeftFill,
  BsStopFill,
  BsPlayFill,
  BsCaretRightFill,
} from "react-icons/bs";

import { Note } from "./useNote";

type Props = {
  note: Note;
};

const PageButtons: React.VFC<Props> = ({ note }) => {
  return (
    <>
      <IconButton
        aria-label="前ページへ"
        onClick={() => note.backPage()}
        size="lg"
        icon={<Icon as={BsCaretLeftFill} />}
      />
      <IconButton
        aria-label={note.isPlaying ? "停止" : "再生"}
        onClick={() => (note.isPlaying ? note.stop() : note.play())}
        size="lg"
        icon={
          note.isPlaying ? <Icon as={BsStopFill} /> : <Icon as={BsPlayFill} />
        }
      />
      <IconButton
        aria-label="次ページへ"
        onClick={() => note.pushPage()}
        size="lg"
        icon={<Icon as={BsCaretRightFill} />}
      />
    </>
  );
};

export default PageButtons;
