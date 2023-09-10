import React, { cloneElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { themeModes } from "../../configs/theme.configs";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.config";
import { Link } from "react-router-dom";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });
  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Topbar = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{ color: "#fff", marginRight: 2 }}
                  component={Link}
                  to={item.path}
                  variant="contained"
                >
                  {item.display}
                </Button>
              ))}
            </Box>
            {/* main menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
