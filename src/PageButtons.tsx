import React, { useState, useEffect } from "react";
import { IconButton, Icon, Button } from "@chakra-ui/react";
import {
  BsCaretLeftFill,
  BsStopFill,
  BsPlayFill,
  BsCaretRightFill,
} from "react-icons/bs";

import { Note } from "./useNote";

type Props = {
  note: Note;
  fps: number;
  onPageChanged: () => void;
};

const PageButtons: React.VFC<Props> = ({ note, fps, onPageChanged }) => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <>
      <IconButton
        aria-label="前ページへ"
        onClick={backPage}
        size="lg"
        icon={<Icon as={BsCaretLeftFill} />}
      />
      <IconButton
        aria-label={isPlaying ? "停止" : "再生"}
        onClick={play}
        size="lg"
        icon={isPlaying ? <Icon as={BsStopFill} /> : <Icon as={BsPlayFill} />}
      />
      <IconButton
        aria-label="次ページへ"
        onClick={pushPage}
        size="lg"
        icon={<Icon as={BsCaretRightFill} />}
      />
    </>
  );
};

export default PageButtons;
