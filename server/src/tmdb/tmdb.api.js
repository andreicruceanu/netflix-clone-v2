import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaTrailer: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaTrailer({ mediaType, mediaId })),
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
  mediaSimilar: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaSimilar({ mediaType, mediaId })),
  mediaTrending: async ({ mediaType, time, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaTrending({ mediaType, time, page })
    ),
  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),
  mediaGenres: async ({ mediaType }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
  mediaSearch: async ({ query, page }) =>
    await axiosClient.get(tmdbEndpoints.mediaSearch({ query, page })),
  mediaDiscover: async ({ mediaType, genreId }) =>
    await axiosClient.get(tmdbEndpoints.mediaDiscover({ mediaType, genreId })),
  actorDetail: async ({ actorId }) =>
    await axiosClient.get(tmdbEndpoints.actorDetail({ actorId })),
  actorMedias: async ({ actorId }) =>
    await axiosClient.get(tmdbEndpoints.actorMedias({ actorId })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
};

export default tmdbApi;
