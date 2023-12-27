import privateClient from "../client/private.client";

const reviewEndpoits = {
  create: "/reviews",
};

const reviewApi = {
  create: async ({
    title,
    content,
    mediaId,
    mediaPoster,
    mediaType,
    rating,
    mediaTitle,
  }) => {
    try {
      const response = await privateClient.post(reviewEndpoits.create, {
        title,
        content,
        mediaId,
        mediaPoster,
        mediaType,
        rating,
        mediaTitle,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default reviewApi;
