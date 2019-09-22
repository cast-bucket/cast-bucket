import {
  BrowserRouter,
  Route as WebRoute,
  Link as WebLink,
  Redirect as WebRedirect,
  withRouter as WebWithRouter,
  Switch as WebSwitch,
  __RouterContext as WebRouterContext
} from "react-router-dom";

export const Router = BrowserRouter;
export const Route = WebRoute;
export const Link = WebLink;
export const Redirect = WebRedirect;
export const Switch = WebSwitch;
export const withRouter = WebWithRouter;
export const __RouterContext = WebRouterContext;
