import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ButtonCard from "./ButtonCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LikeMovie = ({ mediaType, mediaId }) => {
  const { user } = useSelector((state) => state.user);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <ButtonCard>
        <LoadingButton
          variant="text"
          sx={{
            minWidth: "100%",
            padding: "0",
            color: "white",
            span: {
              marginRight: "0px",
              marginLeft: "0px",
            },

            "&:hover ": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          size="large"
          startIcon={<ThumbUpOffAltIcon />}
        />
      </ButtonCard>
      <ButtonCard>
        <LoadingButton
          variant="text"
          sx={{
            minWidth: "100%",
            padding: "0",
            color: "white",
            span: {
              marginRight: "0px",
              marginLeft: "0px",
            },

            "&:hover ": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          size="large"
          startIcon={<ThumbDownOffAltIcon />}
        ></LoadingButton>
      </ButtonCard>
    </>
  );
};

export default LikeMovie;
