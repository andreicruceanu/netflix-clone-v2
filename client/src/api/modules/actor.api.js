import publicClient from "../client/public.client";

const actorEndpoints = {
  detail: ({ actorId }) => `actor/${actorId}`,
  medias: ({ actorId }) => `actor/${actorId}/medias`,
};

const actorApi = {
  detail: async ({ actorId }) => {
    try {
      const response = await publicClient.get(
        actorEndpoints.detail({ actorId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ actorId }) => {
    try {
      const response = await publicClient.get(
        actorEndpoints.medias({ actorId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default actorApi;
