import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteUser() {
  try {
    return await AsyncStorage.removeItem("userSession");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
