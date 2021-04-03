import React, { useState } from "react";
import { Button, Stack, Box, FormLabel, ButtonGroup } from "@chakra-ui/react";

import { Note } from "./useNote";
import FpsSelect from "./FpsSelect";
import SettingsDrawerButton from "./SettingsDrawerButton";
import PageButtons from "./PageButtons";

type Props = {
  note: Note;
};

const Menu: React.VFC<Props> = ({ note }) => {
  const [fps, setFps] = useState(12);

  const deletePages = () => {
    const ok = window.confirm("本当に全削除しますか？");
    if (ok) {
      note.deletePages();
    }
  };

  const shouldHide = new URLSearchParams(location.search).has("hideMenu");
  return (
    <Stack
      position="fixed"
      w="fit-content"
      m="auto"
      bottom="20px"
      right="0"
      left="0"
      opacity="0.95"
      display={shouldHide ? "none" : "flex"}
    >
      <Button size="sm" w="100%">
        {note.pageIndex + 1}/{note.pages.length}
      </Button>
      <ButtonGroup>
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
            <Box>
              <FormLabel htmlFor="deletePages">全削除</FormLabel>
              <Button
                aria-label="全削除する"
                onClick={deletePages}
                id="deletePages"
              >
                全削除する
              </Button>
            </Box>
          </Stack>
        </SettingsDrawerButton>
        <PageButtons note={note} fps={fps} />
      </ButtonGroup>
    </Stack>
  );
};

export default Menu;
