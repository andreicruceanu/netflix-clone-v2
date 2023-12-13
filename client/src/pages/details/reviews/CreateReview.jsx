import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

const CreateReview = ({ media, mediaType, open, handleClose }) => {
  const reviewForm = useFormik({
    initialValues: {
      rating: 5,
      title: "",
      content: "",
      mediaId: media.id,
      mediaType,
      mediaTitle: media?.title || media?.name,
      mediaPoster: media.poster_path || media.backdrop_path,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  console.log(open);
  return (
    <Dialog
      fullWidth
      scroll="body"
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <Box component="form" onSubmit={reviewForm.handleSubmit}>
          <Stack direction="column" spacing={3}>
            <Rating
              value={reviewForm.values.rating}
              onChange={(event, newValue) =>
                reviewForm.setFieldValue("rating", newValue)
              }
            />
            <TextField
              value={reviewForm.values.title}
              onChange={reviewForm.handleChange}
              type="text"
              id="title"
              name="title"
              placeholder="Titlu"
            />
            <TextField
              value={reviewForm.values.content}
              onChange={reviewForm.handleChange}
              type="text"
              placeholder="Titlu"
              id="content"
              name="content"
            />
            <Button type="submit">Add review</Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
