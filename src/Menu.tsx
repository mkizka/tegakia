import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { Note } from "./useNote";

type Props = {
  note: Note;
  onPageChanged: () => void;
};

const Menu: React.VFC<Props> = ({ note, onPageChanged }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(12);

  useEffect(() => {
    /**
     * useEffect内でdepsを更新することで無限ループする
     * 再生開始の場合
     * 1. isPlayingが変化
     * 2. setTimeout発火
     * 3. pageIndexが変化
     * 4. setTimeout発火 以降ループ
     */
    const playInterval = setTimeout(() => {
      if (!isPlaying) return;
      if (note.pageIndex == note.pages.length - 1) {
        note.setPageIndex(0);
      } else {
        note.setPageIndex(note.pageIndex + 1);
      }
      onPageChanged();
    }, 1000 / fps);
    return () => clearInterval(playInterval);
  }, [note.pageIndex, isPlaying]);

  const play = () => {
    setIsPlaying(!isPlaying);
  };

  const pushPage = () => {
    note.backPage();
    onPageChanged();
  };

  const backPage = () => {
    note.pushPage();
    onPageChanged();
  };

  return (
    <Flex position="fixed" zIndex="1">
      <ButtonGroup>
        <IconButton
          aria-label="次ページへ"
          onClick={pushPage}
          icon={<ArrowLeftIcon />}
        />
        <IconButton
          aria-label="前ページへ"
          onClick={backPage}
          icon={<ArrowRightIcon />}
        />
        <Button aria-label={isPlaying ? "停止" : "再生"} onClick={play}>
          {isPlaying ? "stop" : "play"}
        </Button>
      </ButtonGroup>
      {note.pageIndex + 1}/{note.pages.length}
      <InputGroup>
        <Input
          type="number"
          value={fps}
          onChange={(e) => setFps(parseInt(e.target.value) || 0)}
        />
        <InputRightAddon children="fps" />
      </InputGroup>
    </Flex>
  );
};

export default Menu;
