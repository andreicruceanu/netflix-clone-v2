import { Box } from "@mui/material";
import React from "react";
import bg from "../assets/images/home.jpg";
const Home = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", background: "#fff" }}>
      <img src={bg} alt="" width={"100%"} />
    </Box>
  );
};

export default Home;
