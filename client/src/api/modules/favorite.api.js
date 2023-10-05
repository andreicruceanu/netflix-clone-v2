import privateClient from "../client/private.client.js";

const favoriteEndpoints = {
  add: "user/favorites",
};

const favoriteApi = {
  add: async ({
    mediaId,
    mediaTitle,
    mediaType,
    mediaPoster,
    mediaRate,
    mediaGenreIds,
    mediaReleaseDate,
  }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaTitle,
        mediaType,
        mediaPoster,
        mediaRate,
        mediaGenreIds,
        mediaReleaseDate,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default favoriteApi;
