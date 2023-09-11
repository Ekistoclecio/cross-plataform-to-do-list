import { NavigationContainer } from "@react-navigation/native";

import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import { useUserContext } from "../providers/contexts/userContext";

export default function Routes() {
  const { userSession } = useUserContext();
  return (
    <NavigationContainer>
      {userSession != null ? <UserRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
