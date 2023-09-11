import { Box } from "@gluestack-ui/themed";
import Logo from "../Logo";
import UserAvatarTopBar from "../UserAvatarTopBar";

export default function TopBar() {
  return (
    <Box
      backgroundColor="#363d65"
      flex={1}
      marginTop={30}
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      padding={8}
    >
      <Logo />
      <UserAvatarTopBar />
    </Box>
  );
}
