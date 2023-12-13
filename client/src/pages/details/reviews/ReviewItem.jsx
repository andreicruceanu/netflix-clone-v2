import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImgAvatar from "../../../assets/images/default-blue.png";
import { formatDate, formatFullName } from "../../../utils/function";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ReviewItem = ({ review }) => {
  const { user } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: 1,
        display: "flex",
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={review.user.lastNme}
            sx={{ width: 50, height: 50 }}
            src={
              review.user.profilePicture
                ? review.user.profilePicture
                : ImgAvatar
            }
          />
          <Stack>
            <Typography sx={{ fontSize: "18px" }} fontWeight="700">
              {formatFullName(review.user.firstName, review.user.lastName)}
            </Typography>
            <Rating size="small" value={review?.rating} readOnly />
            <Typography variant="caption">
              {formatDate(review.createdAt)}
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ mt: "7px" }}>
          {review.title && (
            <Typography sx={{ fontSize: "15px", mb: "6px" }} fontWeight="600">
              {review.title}
            </Typography>
          )}
          <Typography
            sx={{ fontSize: "15px", color: "#ededed", lineHeight: 1.6 }}
          >
            {review.content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewItem;
