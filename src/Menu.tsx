import React, { useState, useEffect } from "react";
import { IconButton, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { Note } from "./useNote";
import FpsSelect from "./FpsSelect";

type Props = {
  note: Note;
  onPageChanged: () => void;
};

const Menu: React.VFC<Props> = ({ note, onPageChanged }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(12);
  const [saved, setSaved] = useState(false);

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
    note.pushPage();
    onPageChanged();
  };

  const backPage = () => {
    note.backPage();
    onPageChanged();
  };

  const saveNote = () => {
    localStorage.setItem("note", JSON.stringify(note.pages));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <Flex position="fixed" zIndex="1" ml="0.5rem" mt="0.5rem">
      <ButtonGroup>
        <IconButton
          aria-label="前ページへ"
          onClick={backPage}
          icon={<ArrowLeftIcon />}
        />
        <IconButton
          aria-label="次ページへ"
          onClick={pushPage}
          icon={<ArrowRightIcon />}
        />
        <Button aria-label={isPlaying ? "停止" : "再生"} onClick={play}>
          {isPlaying ? "stop" : "play"}
        </Button>
        <Button>
          {note.pageIndex + 1}/{note.pages.length}
        </Button>
        <FpsSelect
          value={fps}
          onChange={(e) => setFps(parseInt(e.target.value))}
        />
        <Button onClick={saveNote}>{saved ? "保存しました" : "保存"}</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Menu;
