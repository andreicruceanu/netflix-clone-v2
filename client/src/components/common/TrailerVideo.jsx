import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import mediaApi from "../../api/modules/media.api";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        position: "realtive",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const NoTrailer = () => {
  return (
    <Container>
      <SentimentVeryDissatisfiedIcon
        sx={{ color: "white", fontSize: "2.8rem" }}
      />
      <Typography variant="h6">
        Sorry, but there is no trailer available for this content at the moment.
      </Typography>
    </Container>
  );
};

const TrailerVideo = ({ open, onClose, mediaType, mediaId }) => {
  const [trailer, setTrailer] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open && mediaType && mediaId) {
      const getTrailer = async () => {
        const { response, err } = await mediaApi.getTrailer({
          mediaType,
          mediaId,
        });
        setIsLoading(false);
        if (response && response.data !== "") {
          setTrailer(response);
        }
        if (err) {
          console.log(err);
        }
      };
      getTrailer();
    }
  }, [open, mediaType, mediaId]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          display: "inline-flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          width: "100%",
          maxWidth: { xs: "300px", md: "850px", lg: "1200px" },
          outline: "none",
          backgroundColor: "black",
          minHeight: { xs: "420px", md: "520px", lg: "600px" },
          zIndex: "9999999",
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            borderColor: "black",
            color: "white",
            padding: "1rem",
            borderTopLeftRadius: "0.25rem",
            borderTopRightRadius: "0.25rem",
            borderWidth: "0 0 1px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zindex: "99999",
          }}
        >
          <Typography
            component="h5"
            variant="body1"
            sx={{
              margin: 0,
              fontSize: "1.25rem",
              lineHeight: "1.5",
              overflow: "hidden",
              fontWeight: "700",
            }}
          >
            Play Trailer
          </Typography>
          <Button variant="text" sx={{ color: "white", padding: "0" }}>
            <CloseIcon onClick={onClose} />
          </Button>
        </Box>
        {isLoading ? (
          <Container>
            <CircularProgress />
          </Container>
        ) : trailer ? (
          <Box>
            <YouTube
              videoId={trailer.key}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                  cc_load_policy: 0,
                  fs: 1,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 1,
                },
              }}
            />
          </Box>
        ) : (
          <NoTrailer />
        )}
      </Box>
    </Modal>
  );
};

export default TrailerVideo;
