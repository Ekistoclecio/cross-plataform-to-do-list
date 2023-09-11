import { Button, Circle, Icon, useDisclosure } from "@chakra-ui/react";
import ArchiveModal from "../ArchiveModal";

export default function ArchiveIcon() {
  const {
    onOpen: onOpenArchiveModal,
    isOpen: isOpenArchiveModal,
    onClose: onCloseArchiveModal,
  } = useDisclosure();

  return (
    <>
      <Button
        bg={"trasnparent"}
        _hover={{ backgroundColor: "#464d75" }}
        size={"max-content"}
        marginRight={2}
        borderRadius={"full"}
        onClick={onOpenArchiveModal}
      >
        <Circle position={"relative"} size={"40px"}>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            width="25px"
            fill={"gray.300"}
            viewBox="0 0 16 16"
          >
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />{" "}
          </Icon>
        </Circle>
      </Button>
      <ArchiveModal isOpen={isOpenArchiveModal} onClose={onCloseArchiveModal} />
    </>
  );
}
