import {
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

const SigninForm = ({ switchAuthState }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [error, setErrorMessage] = useState();

  const inputStyles = {
    backgroundColor: theme.palette.input.main,

    "& MuiInputBase-root": {
      backgroundColor: theme.palette.input.main,
    },
    "& label": {
      color: theme.palette.input.label,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: error ? "2px solid red" : "none",
    },
    "& label.Mui-focused": {
      color: theme.palette.input.label,
    },
  };

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
    <Box component="form">
      <Stack spacing={3}>
        <TextField
          sx={inputStyles}
          id="Email"
          label="Email"
          variant="filled"
          fullWidth
        />
        <TextField
          sx={inputStyles}
          id="Password"
          label="Password"
          type={visible ? "password" : "text"}
          variant="filled"
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
        sx={{ marginTop: 4 }}
      >
        Sign In
      </LoadingButton>
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
        <MUILink component={Link} to={"/forgot-password"} underline="hover">
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
