import React, { forwardRef, useRef, useState } from "react";

const VideoItemWithHoverPure = React.forwardRef(({ src, handleHover }, ref) => {
  const [hoverTimeout] = useState(null);

  const hoverTimeoutRef = useRef(hoverTimeout);

  const handlePointerEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      handleHover(true);
    }, 500);
  };

  const handlePointerLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    handleHover(false);
  };

  return (
    <div
      ref={ref}
      style={{
        zIndex: 9,
        cursor: "pointer",
        borderRadius: 0.5,
        width: "100%",
        position: "relative",
        paddingTop: "calc(9 / 16 * 100%)",
      }}
    >
      <img
        src={src}
        alt="text"
        style={{
          top: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
          borderRadius: "4px",
        }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </div>
  );
});

const VideoItemWithHoverRef = forwardRef((props, ref) => (
  <VideoItemWithHoverPure {...props} ref={ref} />
));
VideoItemWithHoverRef.displayName = "VideoItemWithHoverRef";

export default VideoItemWithHoverRef;
