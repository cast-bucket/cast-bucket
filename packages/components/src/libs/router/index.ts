import {
  BackButton as NativeBackButton,
  Link as NativeLink,
  matchPath as NativeMatchPath,
  NativeRouter,
  Redirect as NativeRedirect,
  Route as NativeRoute,
  RouteComponentProps as NativeRouteComponentProps,
  RouteProps as NativeRouteProps,
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
export const Switch = NativeSwitch;
export const BackButton = NativeBackButton;
export const withRouter = NativeWithRouter;
export const matchPath = NativeMatchPath;
export const useHistory = NativeUseHistory;
export const useLocation = NativeUseLocation;
export const useParams = NativeUseParams;
export interface RouteComponentProps extends NativeRouteComponentProps {}
export interface RouteProps extends NativeRouteProps {}
