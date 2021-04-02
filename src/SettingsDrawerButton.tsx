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
  Icon,
  IconButton,
  IconButtonProps,
  useDisclosure,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

type Props = Omit<IconButtonProps, "aria-label" | "ref" | "onClick" | "icon">;

const SettingsDrawerButton: React.VFC<Props> = ({ children, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openButton = useRef(null);

  return (
    <>
      <IconButton
        {...props}
        aria-label="設定を開く"
        ref={openButton}
        onClick={onOpen}
        icon={<Icon as={BsGearFill} />}
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
