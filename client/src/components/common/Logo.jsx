import React from "react";
import logo from "../../assets/images/logo.png";
import { Box, Link } from "@mui/material";

const Logo = () => {
  return (
    <Box
      component={"a"}
      href="/logo"
      sx={{ display: "inline-block", md: "none" }}
    >
      <Box
        component={"img"}
        src={logo}
        alt="Logo Netflix"
        sx={{ width: 200 }}
      />
    </Box>
  );
};

export default Logo;
