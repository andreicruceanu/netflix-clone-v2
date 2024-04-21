import VideoItemWithHover from "./VideoItemWithHover.jsx";

const MediaItem = ({ media, mediaType }) => {
  return (
    <>
      <VideoItemWithHover media={media} mediaType={mediaType} />
    </>
  );
};

export default MediaItem;
