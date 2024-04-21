import { Stack, Toolbar } from "@mui/material";

import Logo from "./Logo";

const Sidebar = () => {
  return (
    <>
      <Toolbar sx={{ paddingY: "20px" }}>
        <Stack width="100%" direction={"row"} justifyContent={"center"}>
          <Logo />
        </Stack>
      </Toolbar>
    </>
  );
};

export default Sidebar;
