import {
  Box,
  Grid,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import CloseIcon from "@mui/icons-material/Close";
const actionState = {
  signin: "signin",
  signup: "signup",
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signin);

  const handleModalClose = () => dispatch(setAuthModalOpen(false));
  const switchAuthState = (state) => setAction(state);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const isMobile = useMediaQuery("(max-width:650px)");

  return (
    <Modal open={authModalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          width: "450px",
          maxWidth: "100%",
          outline: "none",
          backgroundColor: "black",
          padding: { xs: 3, md: "30px 68px 40px" },
          minHeight: { xs: "100svh", md: "620px" },
          color: "#737373",
          marginBottom: "8%",
          borderRadius: "4px",
        }}
      >
        {action === actionState.signup && (
          <Box
            sx={{
              position: "absolute",
              top: "100px",
              left: { xs: "30xp", md: "60px" },
              color: "#dad9d9",
            }}
            onClick={() => switchAuthState(actionState.signin)}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <KeyboardBackspaceIcon sx={{ marginRight: "5px" }} /> Back
            </Typography>
          </Box>
        )}
        {isMobile && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Logo />
            <CloseIcon sx={{ color: "white" }} onClick={handleModalClose} />
          </Stack>
        )}
        <Box sx={{ textAlign: "left", mt: { xs: "25%", md: 0 } }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontSize: "32px",
              fontWeight: "500",
              wordWrap: "break-word",
              marginBottom: "28px",
              color: "white",
            }}
          >
            {action === actionState.signin ? "Sign In" : "Sign Up"}
          </Typography>
          {action === actionState.signin && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}
          {action === actionState.signup && <SignupForm />}
        </Box>
        <Grid>
          <Typography variant="caption">
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot.
          </Typography>
          <Typography variant="caption" sx={{ color: "#0071eb" }}>
            Learn more.
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AuthModal;
