import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

type Props = {
  children: React.ReactNode;
};

const SettingsDrawerButton: React.VFC<Props> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openButton = useRef(null);

  return (
    <>
      <IconButton
        aria-label="設定を開く"
        ref={openButton}
        onClick={onOpen}
        icon={<SettingsIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={openButton}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">設定</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                閉じる
              </Button>
              <Button colorScheme="blue">保存</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SettingsDrawerButton;
