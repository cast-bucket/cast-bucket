import {
  BackButton as NativeBackButton,
  Link as NativeLink,
  NativeRouter,
  Redirect as NativeRedirect,
  Route as NativeRoute,
  RouteComponentProps as NativeRouteComponentProps,
  Switch as NativeSwitch,
  useHistory as NativeUseHistory,
  useLocation as NativeUseLocation,
  useParams as NativeUseParams,
  withRouter as NativeWithRouter
} from "react-router-native";

export const Router = NativeRouter;
export const Route = NativeRoute;
export const Link = NativeLink;
export const Redirect = NativeRedirect;
export const withRouter = NativeWithRouter;
export const Switch = NativeSwitch;
export const BackButton = NativeBackButton;
export const useHistory = NativeUseHistory;
export const useLocation = NativeUseLocation;
export const useParams = NativeUseParams;
export interface RouteComponentProps extends NativeRouteComponentProps {}
