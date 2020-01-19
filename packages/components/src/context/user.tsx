import React from "react";
import { useAuth } from "./authentication";

const UserContext = React.createContext({});

export const UserProvider = props => {
  const { data }: any = useAuth();
  return <UserContext.Provider value={data.user} {...props} />;
};

export const useAuthenticatedUser = () => React.useContext(UserContext);
