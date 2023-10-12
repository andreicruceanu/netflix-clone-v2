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
};

const mediaApi = {
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
};

export default mediaApi;
