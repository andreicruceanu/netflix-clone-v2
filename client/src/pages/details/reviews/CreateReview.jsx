import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationForm } from "../../../utils/ValidationForm";
import { LoadingButton } from "@mui/lab";
import { suggestionTitleReveiw } from "../../../utils/constants";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Rating,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import reviewApi from "../../../api/modules/review.api";
import CloseIcon from "@mui/icons-material/Close";
import Img from "../../../components/common/Img";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import uiConfigs from "../../../configs/ui.configs.js";
import MaxLineTypography from "../../../components/common/MaxLineTypography.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateReview = ({
  media,
  mediaType,
  open,
  handleClose,
  addReviewToList,
}) => {
  const [poster, setPoster] = useState(null);
  const [mediaName, setMediaName] = useState("");
  const [tagline, setTagLine] = useState("");
  const [onRequest, setOnRequest] = useState(false);

  console.log(media);

  const reviewForm = useFormik({
    initialValues: {
      rating: 0,
      title: "",
      content: "",
      mediaId: media.id,
      mediaType,
      mediaTitle: media?.title || media?.name,
      mediaPoster: media.poster_path || media.backdrop_path,
    },
    validationSchema: validationForm.createReview,
    onSubmit: async (values) => {
      if (onRequest) return;
      setOnRequest(true);
      const { response, err } = await reviewApi.create(values);
      setOnRequest(false);
      if (response) {
        addReviewToList(response);
        toast.success("The review has been submitted");
        handleClose();
        reviewForm.resetForm();
      }
      if (err) {
        toast.error(err.message);
      }
    },
  });

  useEffect(() => {
    if (media) {
      setPoster(
        media?.poster_path ||
          media?.backdrop_path ||
          media?.mediaPoster ||
          media?.profile_path
      );
      setMediaName(media.title || media.name);
      setTagLine(media?.tagline);
    }
  }, [media]);

  const handleTitleReview = (title) => reviewForm.setFieldValue("title", title);

  return (
    <Dialog
      fullWidth
      scroll="body"
      TransitionComponent={Transition}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ backgroundColor: "#181818", padding: 0 }}>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #7d7d7d",
          }}
        >
          <Typography>Write a review</Typography>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Box sx={{ padding: "0 15px", mt: 3 }}>
          <Typography variant="h5" mb="15px">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movie" : "TV series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box sx={{ width: "80px", height: "150px" }}>
              <Img
                src={tmdbConfigs.posterPath(poster)}
                className="posterImg"
                alt={media?.name}
              />
            </Box>
            <Stack>
              <MaxLineTypography
                maxLine={2}
                sx={{ fontSize: "24px", fontWeight: "700" }}
              >
                {mediaName}
              </MaxLineTypography>
              <Typography sx={{ ...uiConfigs.style.tagline, fontSize: "16px" }}>
                {tagline}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          padding="0 15px"
          component="form"
          onSubmit={reviewForm.handleSubmit}
        >
          <Stack direction="column" spacing={3}>
            <Box>
              <Typography>Select a note</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Stack direction="column">
                <Rating
                  value={reviewForm.values.rating}
                  onChange={(event, newValue) =>
                    reviewForm.setFieldValue("rating", newValue)
                  }
                  id="rating"
                  name="rating"
                  size="large"
                />
                {reviewForm.touched.title ? (
                  <Typography component="span" sx={{ color: "#f44336", mt: 1 }}>
                    {reviewForm.errors.rating}
                  </Typography>
                ) : (
                  ""
                )}
              </Stack>
            </Box>
            <Stack direction="column" spacing={2}>
              <Typography>Title (optional)</Typography>
              <TextField
                value={reviewForm.values.title}
                onChange={reviewForm.handleChange}
                type="text"
                id="title"
                name="title"
                placeholder="Titlu"
                helperText={
                  reviewForm.touched.title ? reviewForm.errors.title : ""
                }
                error={
                  reviewForm.touched.title &&
                  reviewForm.errors.title !== undefined
                }
              />
              <Typography sx={{ fontSize: "14px" }}>
                Sugestion title:
              </Typography>
              <Stack direction="row" spacing={1}>
                {suggestionTitleReveiw.map((el, index) => (
                  <Chip
                    label={el}
                    key={index}
                    onClick={() => handleTitleReview(el)}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack direction="column" spacing={2}>
              <Typography>Recenzie</Typography>
              <TextField
                multiline
                rows={4}
                value={reviewForm.values.content}
                onChange={reviewForm.handleChange}
                type="text"
                placeholder="Recenzie"
                id="content"
                name="content"
                helperText={
                  reviewForm.touched.content ? reviewForm.errors.content : ""
                }
                error={
                  reviewForm.touched.content &&
                  reviewForm.errors.content !== undefined
                }
              />
            </Stack>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: "max-content" }}
              loading={onRequest}
            >
              Add review
            </LoadingButton>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
