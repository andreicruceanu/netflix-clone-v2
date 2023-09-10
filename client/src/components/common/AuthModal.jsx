import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

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

  return (
    <Modal open={authModalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          width: "100%",
          maxWidth: "450px",
          outline: "none",
          backgroundColor: "background.modal",
          padding: "60px 68px 40px",
          minHeight: "520px",
        }}
      >
        {action === actionState.signup && (
          <Box
            sx={{ position: "absolute", top: "20px", left: "20px" }}
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
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontSize: "32px",
              fontWeight: "500",
              wordWrap: "break-word",
              marginBottom: "28px",
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
      </Box>
    </Modal>
  );
};

export default AuthModal;
