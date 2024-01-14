import React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AuthModal from "../../components/common/AuthModal";
import { useDispatch } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import ImgBackdrop from "../../assets/images/backdrop.jpg";
import BorderedBottomBox from "./BorderedBottomBox";
import { Link } from "react-router-dom";
import Features from "./Features";
import { ReactComponent as Logo } from "../../assets/images/netflix.svg";

const Header = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <AuthModal />
      <BorderedBottomBox>
        <AppBar
          sx={{
            backgroundColor: "transparent",
            padding: "25px 20px",
            position: "absolute",
          }}
          elevation={0}
        >
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "0px",
            }}
          >
            <Box
              sx={{
                width: { xs: "89px", md: "167px" },
                height: { xs: "24px", md: "45px" },
              }}
            >
              <Logo width="100%" height="100%" />
            </Box>
            <Stack spacing={2} direction="row">
              <Select
                name="lang"
                variant="outlined"
                size="small"
                defaultValue="EN"
                sx={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "common.white",
                  color: "common.white",
                  "& .MuiSelect-icon": {
                    color: "common.white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    padding: { xs: "3px  9px", md: "5.5px 14px" },
                    fontSize: { xs: "12px", md: "16px" },
                  },
                  "& .MuiSvgIcon-root ": {
                    fontSize: { xs: "1.1rem", md: "1.3" },
                  },
                }}
              >
                <MenuItem value="Ro">Română</MenuItem>
                <MenuItem value="EN">English</MenuItem>
              </Select>

              <Button
                variant="contained"
                onClick={() => dispatch(setAuthModalOpen(true))}
                sx={{
                  minWidth: "77px",
                  padding: { xs: "4px 16px", fontWeight: 600 },
                  textTransform: "none",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            position: "relative",
            height: "745px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "center",
            "&::after": {
              position: "absolute",
              content: '""',
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              background: "rgba(0, 0, 0, 0.4)",
              backgroundImage: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.6) 0,
              rgba(0, 0, 0, 0) 60%,
              rgba(0, 0, 0, 0.8) 100%
            )`,
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              left: 0,
              top: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                width: "100%",
              }}
            >
              <img
                src={ImgBackdrop}
                alt="Backdrop Netflix"
                objectFit="cover"
                layout="fill"
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Box>
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1000 }}>
            <Typography
              variant="h2"
              component="h1"
              color="common.white"
              textAlign="center"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: { xs: "700", md: "900" },
                mb: 2,
              }}
            >
              Unlimited movies, TV shows, and more
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="common.white"
              textAlign="center"
              gutterBottom
              sx={{
                fontSize: { xs: "1.125rem", md: "1.5rem" },
                fontWeight: { xs: "400", md: "400" },
              }}
            >
              Watch anywhere. Cancel anytime.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="common.white"
              textAlign="center"
              sx={{
                fontSize: { xs: "1.125rem", md: "1.5rem" },
                fontWeight: { xs: "400", md: "400" },
                my: 3,
              }}
            >
              Ready to watch? Press the button below and enjoy the movies
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs="auto">
                <Button
                  variant="contained"
                  component={Link}
                  to="/browse"
                  size="large"
                  color="primary"
                  sx={{
                    height: "100%",
                    borderRadius: "2px",
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </BorderedBottomBox>
      <Features />
    </>
  );
};

export default Header;
