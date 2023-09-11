import {
  Avatar,
  AvatarFallbackText,
  Button,
  Menu,
  MenuItem,
  MenuItemLabel,
} from "@gluestack-ui/themed";
import { useUserContext } from "../../providers/contexts/userContext";

export default function UserAvatarTopBar() {
  const { logout, userSession } = useUserContext();
  return (
    <>
      <Menu
        backgroundColor={"#53576f"}
        placement="bottom"
        trigger={({ ...triggerProps }) => {
          return (
            <Button
              {...triggerProps}
              size="md"
              width={"$12"}
              backgroundColor="transparent"
            >
              <Avatar
                backgroundColor="#141730"
                size="md"
                borderRadius={"$full"}
              >
                <AvatarFallbackText>
                  {userSession?.name + " " + userSession?.lastName}
                </AvatarFallbackText>
              </Avatar>
            </Button>
          );
        }}
      >
        <MenuItem
          onTouchEnd={() => logout()}
          key="Logout"
          textValue="Logout"
          closeOnSelect={true}
          sx={{
            ":active": {
              backgroundColor: "#33374f",
            },
          }}
        >
          <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
            Sair
          </MenuItemLabel>
        </MenuItem>
      </Menu>
    </>
  );
}
