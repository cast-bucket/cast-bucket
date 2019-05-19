import React from "react";
import { __RouterContext } from "../libs/router";

export default function useRouter() {
  return React.useContext(__RouterContext);
}
