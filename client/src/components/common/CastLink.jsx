import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CastLink = ({ name, id }) => {
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
          color: "#ddd",
          textDecoration: "none",
          wordBreak: "break-word",
          marginRight: "3px",
          "&:hover": {
            textDecoration: "underline",
            color: "white",
          },
        }}
        component={Link}
        to={`/person/${id}`}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default CastLink;
