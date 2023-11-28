import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const VideoJSPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = async () => {
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");
        videoRef.current?.appendChild(videoElement);

        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            onReady && onReady(player);
          }
        ));
      } else {
        const player = playerRef.current;
        player.width(options.width);
        player.height(options.height);
      }
    };

    initializePlayer();
  }, [options, onReady, videoRef]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJSPlayer;
