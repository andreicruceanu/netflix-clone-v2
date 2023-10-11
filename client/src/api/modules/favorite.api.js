import privateClient from "../client/private.client.js";

const favoriteEndpoints = {
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
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
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default favoriteApi;
