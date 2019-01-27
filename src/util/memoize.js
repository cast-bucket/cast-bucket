import { AsyncStorage } from "react-native";

export const memoSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    throw error;
  }
};

export const memoCheck = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    // We have data!!
    if (value !== null) {
      const json = JSON.parse(value);
      const difference = Math.floor((Date.now() - json.timestamp) / 1000 / 60);
      if (difference > 15) {
        await AsyncStorage.removeItem(key);
        throw new Error("locally stored value is no longer valid!");
      }
      return json;
    }
  } catch (error) {
    throw error;
    // Error retrieving data
  }
};
