import {
  BrowserRouter,
  Link as WebLink,
  matchPath as WebMatchPath,
  Redirect as WebRedirect,
  Route as WebRoute,
  RouteComponentProps as WebRouteComponentProps,
  RouteProps as WebRouteProps,
  Switch as WebSwitch,
  useHistory as WebUseHistory,
  useLocation as WebUseLocation,
  useParams as WebUseParams,
  withRouter as WebWithRouter
} from "react-router-dom";

export const Router = BrowserRouter;
export const Route = WebRoute;
export const Link = WebLink;
export const Redirect = WebRedirect;
export const Switch = WebSwitch;
export const withRouter = WebWithRouter;
export const matchPath = WebMatchPath;
export const useHistory = WebUseHistory;
export const useLocation = WebUseLocation;
export const useParams = WebUseParams;
export interface RouteComponentProps extends WebRouteComponentProps {}
export interface RouteProps extends WebRouteProps {}
