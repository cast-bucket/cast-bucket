import React from "react";
import { AppState } from "../redux/store";
import { useAuth } from "./authentication";
interface IContextProps {
  state: AppState;
  dispatch: ({ type }: { type: string }) => void;
}

const UserContext = React.createContext({} as IContextProps);

export const UserProvider = props => {
  const {
    data: { user }
  } = useAuth();
  return <UserContext.Provider value={user} {...props} />;
};

export const useAuthenticatedUser = () => React.useContext(UserContext);
