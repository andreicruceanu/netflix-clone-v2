import Typography from "@mui/material/Typography";

const MaxLineTypography = ({ maxLine, children, sx, ...others }) => {
  return (
    <Typography
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLine,
        WebkitBoxOrient: "vertical",
        ...sx,
      }}
      {...others}
    >
      {children}
    </Typography>
  );
};

export default MaxLineTypography;
