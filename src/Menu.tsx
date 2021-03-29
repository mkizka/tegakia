import React, { useState, useEffect } from "react";
import {
  IconButton,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import { Note } from "./useNote";
import FpsSelect from "./FpsSelect";
import SettingsDrawerButton from "./SettingsDrawerButton";

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

  const shouldHide = new URLSearchParams(location.search).has("hideMenu");
  return (
    <Flex
      position="fixed"
      zIndex="1"
      ml="0.5rem"
      mt="0.5rem"
      display={shouldHide ? "none" : undefined}
    >
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
        <SettingsDrawerButton>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="fps">FPS(再生速度)</FormLabel>
              <FpsSelect
                id="fps"
                value={fps}
                onChange={(e) => setFps(parseInt(e.target.value))}
              />
            </Box>
          </Stack>
        </SettingsDrawerButton>
      </ButtonGroup>
    </Flex>
  );
};

export default Menu;
