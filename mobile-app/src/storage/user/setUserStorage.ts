import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function setUser(userSession: string) {
  try {
    await AsyncStorage.setItem("userSession", userSession);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
