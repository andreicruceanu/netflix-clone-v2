import FavoriteList from "../pages/FavoriteList";
import Home from "../pages/Home";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import ProtectedPage from "../components/common/ProtectedPage";
import Account from "../pages/Account";
import MediaDetail from "../pages/details/MediaDetail";
import ActorDetail from "../pages/actorDetail/ActorDetail";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  actor: (id) => `/actor/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
  search: (query) => `/search/:${query}`,
};

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
    path: "/actor/:actorId",
    element: <ActorDetail />,
    state: "actor.detail",
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
  {
    path: "/account",
    element: (
      <ProtectedPage>
        <Account />
      </ProtectedPage>
    ),
    state: "account",
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];

export default routes;
