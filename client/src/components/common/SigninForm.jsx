import { useState } from "react";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Link as MUILink,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { validationForm } from "../../utils/ValidationForm";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { inputStyledBlack } from "../../utils/InputStyle";

import userApi from "../../api/modules/user.api";

const SigninForm = ({ switchAuthState }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const [isLoginRequest, setIsLoginRequest] = useState(false);

  const dispatch = useDispatch();

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
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
      }
      if (err) {
        setErrorMessage(err.message);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={signinForm.handleSubmit}
      sx={{ marginTop: { xs: "0", md: "25%", lg: "25%" } }}
    >
      <Stack spacing={3}>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          name="email"
          onBlur={signinForm.handleBlur}
          onChange={signinForm.handleChange}
          value={signinForm.values.email}
          helperText={signinForm.touched.email ? signinForm.errors.email : ""}
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          fullWidth
          color="secondary"
          InputLabelProps={{
            style: { color: "#8c8c8c" },
          }}
          sx={inputStyledBlack}
          autoComplete="off"
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          onBlur={signinForm.handleBlur}
          onChange={signinForm.handleChange}
          value={signinForm.values.password}
          type={visible ? "password" : "text"}
          variant="filled"
          color="secondary"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={
            signinForm.touched.password ? signinForm.errors.password : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{ color: "white", padding: 2 }}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? "Hide" : "Show"}
                </Button>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: "#8c8c8c" },
          }}
          sx={inputStyledBlack}
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
