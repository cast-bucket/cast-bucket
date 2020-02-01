import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { MaterialIcons } from "../libs/vector-icons";
import configureStore from "../redux/store";
import { AuthProvider } from "./authentication";
import { UserProvider } from "./user";

const initialState = {};
const store = configureStore(initialState);

function AppProviders({ children }) {
  return (
    <PaperProvider settings={{ icon: props => <MaterialIcons {...props} /> }}>
      <AuthProvider>
        <UserProvider>
          <StoreProvider store={store}>{children}</StoreProvider>
        </UserProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

export default AppProviders;
