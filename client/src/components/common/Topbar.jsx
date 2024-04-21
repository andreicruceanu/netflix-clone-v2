import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routesGen } from "../../routes/routes";
import { useSearchGlobal } from "../context/SearchContext";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";

import menuConfigs from "../../configs/menu.config";
import UserMenu from "./UserMenu";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [showButton, setShowButton] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const { querySearch } = useSearchGlobal();
  const location = useLocation();

  const handleHideen = () => {
    setShowButton(false);
  };

  useEffect(() => {
    if (location.pathname === routesGen.home) {
      setShowButton(true);
    }
  }, [location.pathname]);

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
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
            </Box>
            {/* main menu */}
            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mr: { xs: "0", md: 3 } }}
            >
              <SearchBox handleHideen={handleHideen} />
              {showButton && (
                <Box>
                  {!user && (
                    <Button
                      variant="contained"
                      onClick={() => dispatch(setAuthModalOpen(true))}
                      sx={{ minWidth: "87px" }}
                    >
                      sign in
                    </Button>
                  )}
                  {user && <UserMenu />}
                </Box>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default React.memo(Topbar);
