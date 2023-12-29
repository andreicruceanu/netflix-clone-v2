import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CastLink = ({ name, id, index }) => {
  return (
    <Box
      component="span"
      sx={{
        boxSizing: "border-box",
        letterSpacing: 0,
        lineHeight: "20px",
        wordBreak: "breakWord",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "white",
          textDecoration: "none",
          wordBreak: "break-word",
          marginRight: "3px",
          "&:hover": {
            textDecoration: "underline",
            color: "white",
          },
        }}
        component={Link}
        to={`/actor/${id}`}
      >
        {name}
        {index < 4 && <span>, </span>}
      </Typography>
    </Box>
  );
};

export default CastLink;
