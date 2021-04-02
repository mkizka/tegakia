import React, { useState } from "react";
import { Button, Flex, Stack, Box, FormLabel, Center } from "@chakra-ui/react";

import { Note } from "./useNote";
import FpsSelect from "./FpsSelect";
import SettingsDrawerButton from "./SettingsDrawerButton";
import PageButtons from "./PageButtons";

type Props = {
  note: Note;
  onPageChanged: () => void;
};

const Menu: React.VFC<Props> = ({ note, onPageChanged }) => {
  const [fps, setFps] = useState(12);

  const deletePages = () => {
    const ok = window.confirm("本当に全削除しますか？");
    if (ok) {
      note.deletePages();
    }
  };

  const shouldHide = new URLSearchParams(location.search).has("hideMenu");
  return (
    <Box
      position="fixed"
      zIndex="1"
      p="0.5rem"
      w="100%"
      h="100%"
      flexDirection="column"
      display={shouldHide ? "none" : "flex"}
    >
      <Flex justifyContent="flex-end">
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
      </Flex>
      <Center mt="auto" mb="2rem">
        <PageButtons note={note} fps={fps} onPageChanged={onPageChanged} />
      </Center>
    </Box>
  );
};

export default Menu;
