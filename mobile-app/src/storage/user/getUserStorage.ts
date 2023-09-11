import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getUser() {
  try {
    return await AsyncStorage.getItem("userSession");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
