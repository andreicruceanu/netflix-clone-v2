import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  trending: ({ mediaType, time, page }) =>
    `/trending/${mediaType}/${time}?page=${page}`,
  trailer: ({ mediaType, mediaId }) =>
    `${mediaType}/${mediaId}/officialTrailer`,
  moreDetails: ({ mediaType, mediaId }) =>
    `${mediaType}/${mediaId}/moreDetails`,
  similarMovie: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/similar`,
  heroMedia: ({ mediaType, mediaCategory }) =>
    `${mediaType}/${mediaCategory}/heroMedia`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ query, page }) => `/search?query=${query}&page=${page}`,
  discover: ({ mediaType, genreId }) => `/${mediaType}/discover/${genreId}`,
};

const mediaApi = {
  heroMedia: async ({ mediaType, mediaCategory }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.heroMedia({ mediaType, mediaCategory })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDiscover: async ({ mediaType, genreId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.discover({ mediaType, genreId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTrending: async ({ mediaType, time, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.trending({ mediaType, time, page })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTrailer: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.trailer({ mediaType, mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getMoreDetails: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.moreDetails({ mediaType, mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getSimilarMovie: async ({ mediaType, mediaId }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.similarMovie({ mediaType, mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
