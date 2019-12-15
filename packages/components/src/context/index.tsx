import React from "react";
import { AuthProvider } from "./authentication";
import { UserProvider } from "./user";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

export default AppProviders;
