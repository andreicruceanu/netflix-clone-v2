import { useEffect, useState, useRef } from "react";
import { usePortal } from "../provider/PortalProvider";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";
import tmdbConfigs from "../../api/configs/tmdb.configs";

// Interfața poate fi omisă în JSX
// interface VideoItemWithHoverProps {
//   video: Movie;
// }

export default function VideoItemWithHover({ media, mediaType }) {
  const setPortal = usePortal();
  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setPortal(elementRef.current, media, mediaType);
    }
  }, [isHovered]);

  const [poster, setPoster] = useState("");

  useEffect(() => {
    setPoster(
      media.mediaPoster ||
        media.backdrop_path ||
        media.poster_path ||
        media.profile_path
    );
  }, [media, mediaType]);

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={tmdbConfigs.posterPath(poster)}
    />
  );
}
