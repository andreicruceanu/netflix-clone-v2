import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <Box component={Link} to="/" sx={{ display: "flex", md: "none" }}>
      <Box
        component={"img"}
        src={logo}
        alt="Logo Netflix"
        sx={{ width: 120 }}
      />
    </Box>
  );
};

export default Logo;
