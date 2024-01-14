import IconButton from "@mui/material/IconButton";

const NetflixIconButton = ({ children, sx, ...others }) => {
  return (
    <IconButton
      sx={{
        color: "white",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "grey.700",
        padding: 0,
        "&:hover, &:focus": {
          borderColor: "grey.200",
        },
        ...sx,
      }}
      {...others}
    >
      {children}
    </IconButton>
  );
};
export default NetflixIconButton;
