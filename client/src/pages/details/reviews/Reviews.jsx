import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../../redux/features/authModalSlice";
import { styled } from "@mui/material/styles";
import { calculateProgress, totalReview } from "../../../utils/function";
import { starItem } from "../../../utils/constants";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import ReviewItem from "./ReviewItem";
import CreateReview from "./CreateReview";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#33373d",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#fff",
  },
}));

const Reviews = ({ media, mediaType, reviews, rating }) => {
  const [open, setOpen] = useState(false);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewCount, setReviewCount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }
    setOpen(true);
  };

  const addReviewToList = (newReview) => {
    setListReviews((prevReviews) => [newReview, ...prevReviews]);
    setFilteredReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <React.Fragment>
      <CreateReview
        open={open}
        handleClose={handleClose}
        media={media}
        mediaType={mediaType}
        addReviewToList={addReviewToList}
      />
      <Box sx={{ mt: "50px", mb: "60px" }}>
        <ContainerMediaDetails>
          <Typography
            sx={{
              fontSize: "24px",
              color: "white",
              marginBottom: "25px",
              fontWeight: 600,
            }}
          >
            Reviews
          </Typography>
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "40fr 60fr", lg: "15fr 35fr 50fr" },
                padding: 0,
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  gridColumn: { xs: "2/3", lg: "3/-1" },
                  gridRow: { xs: "1/2", lg: "2/3" },
                  textAlign: { xs: "right", md: "right", lg: "center" },
                  border: { xs: "none", md: "none", lg: "1px solid #e1e1e5" },
                  padding: { xs: "0", md: "0", lg: "1rem 10rem" },
                }}
              >
                <Typography
                  sx={{ display: { xs: "none", md: "none", lg: "block" } }}
                >
                  Did you like the
                  {mediaType === tmdbConfigs.mediaType.movie
                    ? " movie"
                    : " series"}
                  ?
                </Typography>
                <Typography
                  sx={{ display: { xs: "none", md: "none", lg: "block" } }}
                >
                  Tell everyone what you think here.
                </Typography>
                <Button variant="contained" onClick={handleOpen}>
                  Add review
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: "1/2",
                  gridRow: "2/3",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  height: { lg: "100%" },
                  background: "#424343",
                  borderRadius: "12px",
                  maxWidth: "240px",
                  padding: "10px 0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "35px",
                    fontWeight: 700,
                    letterSpacing: "3px",
                  }}
                >
                  {rating.rating}
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={rating.rating}
                  precision={0.5}
                  readOnly
                  sx={{
                    margin: "0 auto",
                    size: {
                      xs: "small",
                      md: "small",
                      lg: "large",
                    },
                  }}
                  size="small"
                />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 500, mt: "10px" }}
                >
                  {totalReview(rating.totalReviews)}
                </Typography>
              </Box>
              <Box
                sx={{
                  gridColumn: { xs: "2/-1", lg: "2/3" },
                  gridRow: "2/3",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {starItem.map((el, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "43px auto 24px",
                      gap: "12px",
                      marginBlock: { xs: "0", lg: "5px" },
                      alignItems: "center",
                    }}
                  >
                    <Typography component="span">{el.name}</Typography>
                    <BorderLinearProgress
                      variant="determinate"
                      value={calculateProgress(
                        rating[`star${5 - index}`],
                        rating.totalReviews
                      )}
                    />
                    <Typography component="span" sx={{}}>
                      {rating[`star${5 - index}`]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          {filteredReviews.map((item) => (
            <Box key={item.id} sx={{ mt: 3 }}>
              <ReviewItem review={item} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore} sx={{ mt: 1 }} size="large" fullWidth>
              load more
            </Button>
          )}
        </ContainerMediaDetails>
      </Box>
    </React.Fragment>
  );
};

export default Reviews;
