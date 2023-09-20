import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { validationForm } from "../../utils/ValidationForm";
import { inputStyledBlack } from "../../utils/InputStyle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import userApi from "../../api/modules/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const SignupForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationForm.signup,
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);
      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
      }
      if (err) setErrorMessage(err.message);
    },
  });
  const EndAdorment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          sx={{
            color: visible
              ? theme.palette.input.label
              : theme.palette.input.visible,
          }}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <VisibilityOffIcon sx={{ fontSize: 22 }} />
          ) : (
            <RemoveRedEyeIcon sx={{ fontSize: 22 }} />
          )}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          sx={inputStyledBlack}
          id="firstName"
          label="FirstName"
          variant="outlined"
          name="firstName"
          onChange={signupForm.handleChange}
          value={signupForm.values.firstName}
          onBlur={signupForm.handleBlur}
          helperText={
            signupForm.touched.firstName ? signupForm.errors.firstName : ""
          }
          error={
            signupForm.touched.firstName &&
            signupForm.errors.firstName !== undefined
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="LastName"
          label="LastName"
          name="lastName"
          variant="outlined"
          onChange={signupForm.handleChange}
          value={signupForm.values.lastName}
          onBlur={signupForm.handleBlur}
          helperText={
            signupForm.touched.lastName ? signupForm.errors.lastName : ""
          }
          error={
            signupForm.touched.lastName &&
            signupForm.errors.lastName !== undefined
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="Email"
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          onBlur={signupForm.handleBlur}
          onChange={signupForm.handleChange}
          value={signupForm.values.email}
          helperText={signupForm.touched.email ? signupForm.errors.email : ""}
          error={
            signupForm.touched.email && signupForm.errors.email !== undefined
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="Password"
          label="Password"
          name="password"
          type={visible ? "password" : "text"}
          variant="outlined"
          onChange={signupForm.handleChange}
          onBlur={signupForm.handleBlur}
          value={signupForm.values.password}
          helperText={
            signupForm.touched.password ? signupForm.errors.password : ""
          }
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          InputProps={{
            endAdornment: <EndAdorment />,
          }}
          fullWidth
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign Up
      </LoadingButton>
      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
