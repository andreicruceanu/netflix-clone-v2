import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MUILink,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { validationForm } from "../../utils/ValidationForm";
import { inputStyledBlack } from "../../utils/InputStyle";
import userApi from "../../api/modules/user.api";

const SigninForm = ({ switchAuthState }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationForm.signin,
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        console.log("Succes");
      }
      if (err) {
        setErrorMessage(err.message);
      }
    },
  });

  const EndAdorment = ({ visible, setVisible }) => {
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
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          sx={inputStyledBlack}
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          onBlur={signinForm.handleBlur}
          onChange={signinForm.handleChange}
          value={signinForm.values.email}
          helperText={signinForm.touched.email ? signinForm.errors.email : ""}
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          fullWidth
        />
        <TextField
          sx={inputStyledBlack}
          id="password"
          name="password"
          label="Password"
          onBlur={signinForm.handleBlur}
          onChange={signinForm.handleChange}
          value={signinForm.values.password}
          type={visible ? "password" : "text"}
          variant="outlined"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={
            signinForm.touched.password ? signinForm.errors.password : ""
          }
          InputProps={{
            endAdornment: (
              <EndAdorment visible={visible} setVisible={setVisible} />
            ),
          }}
          fullWidth
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        loading={isLoginRequest}
        sx={{ marginTop: 4 }}
      >
        Sign In
      </LoadingButton>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          sx={{ color: theme.palette.input.label }}
          control={<Checkbox sx={{ color: theme.palette.input.label }} />}
          label="Remember me"
        />
        <MUILink
          sx={{
            color: theme.palette.input.label,

            "&:hover": {
              color: theme.palette.primary.main,
              transition: ".2s",
            },
          }}
          component={Link}
          to={"/forgot-password"}
          underline="hover"
        >
          {"Forgot password?"}
        </MUILink>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography
          sx={{
            display: "inline-block",
            color: theme.palette.input.visible,
            marginRight: "10px",
          }}
        >
          New to Netflix?
        </Typography>
        <Typography
          sx={{
            display: "inline-block",
            fontWeight: 600,
            fontSize: "17px",
            color: theme.palette.primary.main,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => switchAuthState()}
        >
          Sign up now.
        </Typography>
      </Box>
    </Box>
  );
};

export default SigninForm;
