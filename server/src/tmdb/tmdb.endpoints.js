import tmdbConfig from "./tmdb.config.js";

const tmbdEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, page),
  mediaSimilar: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/similar`),
  mediaTrending: ({ mediaType, time, page }) =>
    tmdbConfig.getUrl(`trending/${mediaType}/${time}`, page),
  mediaDetail: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}`),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  mediaTrailer: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  mediaRecommend: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
  mediaImages: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
  mediaSearch: ({ query, page }) =>
    tmdbConfig.getUrl(`search/multi`, { query, page }),
  mediaDiscover: ({ mediaType, genreId }) =>
    tmdbConfig.getUrl(`discover/${mediaType}`, {
      include_adult: false,
      include_video: false,
      language: "en-US",
      page: 1,
      with_genres: genreId,
      sort_by: "popularity.desc",
    }),
  actorDetail: ({ actorId }) => tmdbConfig.getUrl(`person/${actorId}`),
  actorMedias: ({ actorId }) =>
    tmdbConfig.getUrl(`person/${actorId}/combined_credits`),
};

export default tmbdEndpoints;
