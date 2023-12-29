import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const actorDetail = async (req, res) => {
  try {
    const { actorId } = req.params;
    const actor = await tmdbApi.actorDetail({ actorId });
    responseHandler.ok(res, actor);
  } catch {
    responseHandler.error(res);
  }
};

const actorMedia = async (req, res) => {
  try {
    const { actorId } = req.params;
    const medias = await tmdbApi.actorMedias({ actorId });

    responseHandler.ok(res, medias);
  } catch (err) {
    responseHandler.error(res);
  }
};

export default { actorDetail, actorMedia };
