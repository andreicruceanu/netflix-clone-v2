import privateClient from "../client/private.client.js";

const preferencesEndpoints = {
  getPreferences: `user/getPreferences`,
  reactionControl: ({ type }) => `user/preferences?type=${type}`,
};

const preferencesApi = {
  reactionControl: async ({ mediaId, mediaType, type }) => {
    try {
      const response = await privateClient.post(
        preferencesEndpoints.reactionControl({ type }),
        {
          mediaId,
          mediaType,
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPreferences: async () => {
    try {
      const response = await privateClient.get(
        preferencesEndpoints.getPreferences
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default preferencesApi;
