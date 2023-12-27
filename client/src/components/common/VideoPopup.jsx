import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        zIndex: 99999999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(3.5px)",
          WebkitBackdropFilter: "blur(3.5px)",
          opacity: show ? 1 : 0,
          transition: "opacity 400ms",
        }}
        onClick={hidePopup}
      />
      <Box
        sx={{
          position: "relative",
          width: "800px",
          aspectRatio: "16/9",
          backgroundColor: "white",
          transform: show && "scale(1)",
          transition: "transform 250ms",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "-25px",
            fontWeight: "700",
            right: 0,
            color: "white",
            cursor: "pointer",
          }}
          component="span"
          onClick={hidePopup}
        >
          Close
        </Typography>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </Box>
    </Box>
  );
};

export default VideoPopup;
