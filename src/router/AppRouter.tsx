import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./Routes";

const Router = () => {
  return useRoutes(routes);
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default AppRouter;