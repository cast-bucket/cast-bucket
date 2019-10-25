import AsyncStorage from "@react-native-community/async-storage";

const MEMOIZATION_TTL = 30;
export const memoSet = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    throw error;
  }
};

export const memoCheck = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const json = JSON.parse(value);
      const difference = Math.floor((Date.now() - json.timestamp) / 1000 / 60);
      if (difference > MEMOIZATION_TTL) {
        await memoDelete(key);
        return null;
      }
      return json;
    }
  } catch (error) {
    throw error;
    // Error retrieving data
  }
};

export const memoDelete = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
