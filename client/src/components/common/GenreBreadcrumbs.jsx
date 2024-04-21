import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Separator = (
  <Box
    component="span"
    sx={{
      width: 4,
      height: 4,
      borderRadius: "50%",
      bgcolor: "text.disabled",
    }}
  />
);

const GenreBreadcrumbs = ({ genres, ...others }) => {
  return (
    <Breadcrumbs separator={Separator} {...others}>
      {genres.map((genre, idx) => (
        <Typography key={idx} sx={{ color: "text.primary" }}>
          {genre}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default GenreBreadcrumbs;
