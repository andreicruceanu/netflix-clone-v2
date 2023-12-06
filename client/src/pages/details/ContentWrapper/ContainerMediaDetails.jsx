import { Box } from "@mui/material";

const ContainerMediaDetails = ({ children }) => {
  return (
    <Box
      sx={{
        color: "primary.contrastText",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerMediaDetails;
