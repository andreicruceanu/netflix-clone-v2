import FavoriteList from "../pages/FavoriteList";
import Home from "../pages/Home";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PersonDetail from "../pages/PersonDetail";

const routes = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/favorites",
    element: <FavoriteList />,
  },
];

export default routes;
