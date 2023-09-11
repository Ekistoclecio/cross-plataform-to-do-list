import { createContext, useContext, useEffect, useState } from "react";
import signIn from "../../services/api/signIn";
import { Alert } from "react-native";
import setUser from "../../storage/user/setUserStorage";
import deleteUser from "../../storage/user/deleteUserStorage";
import getUser from "../../storage/user/getUserStorage";

interface UserContextInterface {
  currentDate: string;
  userSession: UserSessionInterface | null;
  getCurrentDate: () => string;
  login: (val: AuthUserFormInterface) => void;
  logout: () => void;
}

const userContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

const Provider = userContext.Provider;

export const UserProvider = (props: any) => {
  const [userSession, setUserSession] = useState<UserSessionInterface | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState("");

  async function login(authUserForm: AuthUserFormInterface) {
    const responseAuthLogin = await signIn(authUserForm);
    if (responseAuthLogin?.status == 200) {
      const userObj = {
        name: responseAuthLogin.data.name,
        lastName: responseAuthLogin.data.lastName,
        token: responseAuthLogin.data.token,
      };
      setUser(JSON.stringify(responseAuthLogin.data));
      setUserSession(userObj);
    } else {
      Alert.alert("Falha no Login", "Verifique os dados e tente novamente");
    }
  }

  async function logout() {
    setUserSession(null);
    deleteUser();
  }

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formatedMonth;
    let formatedDay;

    if (month < 10) {
      formatedMonth = `0${month}`;
    } else {
      formatedMonth = month;
    }
    if (day < 10) {
      formatedDay = `0${day}`;
    } else {
      formatedDay = day;
    }

    setCurrentDate(`${year}-${formatedMonth}-${formatedDay}`);
    return `${year}-${formatedMonth}-${formatedDay}`;
  }

  useEffect(() => {
    (async () => {
      const session = await getUser();
      setUserSession(() => JSON.parse(session ?? "null"));
    })();
  }, []);

  return (
    <Provider
      value={{
        currentDate,
        userSession,
        login,
        logout,
        getCurrentDate,
      }}
    >
      {props.children}
    </Provider>
  );
};

export const useUserContext = () => useContext(userContext);
