import { lazy, type JSX } from "react";

const Home = lazy(() => import("./../pages/Home.tsx"));
const NotFound = lazy(() => import("./../pages/NotFound.tsx"));
type Route = {
    name: string;
    path: string;
    component: JSX.Element;
};
type Link = Omit<Route, "component">;

const routes = [
    {
        name: "Home",
        path: "/",
        component: <Home />,
    },
    {
        name: "notFound",
        path: "*",
        component: <NotFound />,
    },
] satisfies Route[];

const links: Link[] = routes.filter((route: Route) => !!route.name);

export { routes, links };
