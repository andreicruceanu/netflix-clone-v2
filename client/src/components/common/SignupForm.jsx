import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { validationForm } from "../../utils/ValidationForm";
import userApi from "../../api/modules/user.api";

const SignupForm = () => {
  const theme = useTheme();
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
      setIsLoginRequest(true);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);
      console.log(response, err);
    },
  });

  const inputStyles = {
    backgroundColor: theme.palette.input.main,

    "& MuiInputBase-root": {
      backgroundColor: theme.palette.input.main,
    },
    "& .MuiFormHelperText-root": {
      color: "#e73004",
      fontSize: "13px",
      background: "none",
    },
    "& label": {
      color: theme.palette.input.label,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: undefined ? "2px solid red" : "none",
    },
    "& label.Mui-focused": {
      color: theme.palette.input.label,
    },
  };

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
          id="firstName"
          label="FirstName"
          variant="filled"
          name="firstName"
          sx={inputStyles}
          onChange={signupForm.handleChange}
          value={signupForm.values.firstName}
          onBlur={signupForm.handleBlur}
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.firstName ? signupForm.errors.firstName : ""
          }
        />
        <TextField
          id="LastName"
          label="LastName"
          name="lastName"
          variant="filled"
          sx={inputStyles}
          onChange={signupForm.handleChange}
          value={signupForm.values.lastName}
          onBlur={signupForm.handleBlur}
          helperText={
            signupForm.touched.lastName ? signupForm.errors.lastName : ""
          }
        />
        <TextField
          sx={inputStyles}
          id="Email"
          label="Email"
          variant="filled"
          name="email"
          fullWidth
          onBlur={signupForm.handleBlur}
          onChange={signupForm.handleChange}
          value={signupForm.values.email}
          helperText={signupForm.touched.email ? signupForm.errors.email : ""}
        />
        <TextField
          sx={inputStyles}
          id="Password"
          label="Password"
          name="password"
          type={visible ? "password" : "text"}
          variant="filled"
          onChange={signupForm.handleChange}
          onBlur={signupForm.handleBlur}
          value={signupForm.values.password}
          helperText={
            signupForm.touched.password ? signupForm.errors.password : ""
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
      >
        Sign Up
      </LoadingButton>
    </Box>
  );
};

export default SignupForm;
