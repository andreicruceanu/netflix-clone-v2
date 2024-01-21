import FavoriteList from "../pages/FavoriteList";
import Home from "../pages/Home";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import ProtectedPage from "../components/common/ProtectedPage";
import Account from "../pages/Account";
import MediaDetail from "../pages/details/MediaDetail";
import ActorDetail from "../pages/actorDetail/ActorDetail";
import TVShows from "../pages/TV Shows/TVShows";

export const routesGen = {
  home: "/browse",
  mediaList: (type) => `/browse/${type}`,
  mediaDetail: (type, id) => `/browse/${type}/${id}`,
  mediaSearch: "/search",
  tvShows: (genreId) => `/browse/genre/${genreId}`,
  actor: (id) => `/browse/actor/${id}`,
  favoriteList: "/browse/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
  search: (query) => `/browse/search/:${query}`,
};

const routes = [
  {
    element: <Home />,
    path: "/browse",
    state: "home",
    index: true,
  },
  {
    path: "/browse/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/browse/actor/:actorId",
    element: <ActorDetail />,
    state: "actor.detail",
  },
  {
    path: "/browse/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/browse/favorites",
    element: <FavoriteList />,
  },
  {
    path: "/browse/account",
    element: (
      <ProtectedPage>
        <Account />
      </ProtectedPage>
    ),
    state: "/browse/account",
  },
  {
    path: "/browse/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
  {
    path: "/browse/genre/:id",
    element: <TVShows />,
  },
];

export default routes;
