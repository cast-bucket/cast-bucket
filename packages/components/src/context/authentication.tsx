import { IUser } from "@cast-bucket/core/";
import React from "react";
import { useAsync } from "react-async";
import { Text, View } from "react-native";
import FullPageSpinner from "../components/common/FullPageSpinner";
import { AuthClient, getUser } from "../helpers/auth-client";

async function bootstrapAppData() {
  const data = await getUser();
  if (!data) {
    return { user: null };
  }
  return {
    user: data
  };
}

const AuthContext = React.createContext({});
export const AuthProvider = props => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);

  const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: bootstrapAppData
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageSpinner />;
    }
    if (isRejected || error) {
      return (
        <View>
          <Text>Uh oh... There's a problem. Try refreshing the app.</Text>
        </View>
      );
    }
  }

  const login = (user: IUser) => AuthClient.login(user).then(reload);
  const register = (user: IUser) => AuthClient.register(user).then(reload);
  const logout = () => AuthClient.logout().then(reload);

  return <AuthContext.Provider value={{ data, login, logout, register }} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
