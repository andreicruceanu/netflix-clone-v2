import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Alert, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { inputStyledBlack } from "../../utils/InputStyle";
import { validationForm } from "../../utils/ValidationForm";

import userApi from "../../api/modules/user.api";

const FormChangePassword = () => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const formUpdate = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationForm.changePassword,
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.changePassword(values);
      setIsLoginRequest(false);
      if (response) {
        formUpdate.resetForm();
        toast.success("Password saved");
      }
      if (err) {
        toast.error(err.message);
        setErrorMessage(err.message);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formUpdate.handleSubmit}
      sx={{ padding: 5 }}
    >
      <Stack spacing={3}>
        <TextField
          sx={inputStyledBlack}
          id="oldPassword"
          label="Old password"
          variant="outlined"
          name="oldPassword"
          type="password"
          onChange={formUpdate.handleChange}
          onBlur={formUpdate.handleBlur}
          fullWidth
          value={formUpdate.values.oldPassword}
          error={
            formUpdate.touched.oldPassword &&
            formUpdate.errors.oldPassword !== undefined
          }
          helperText={
            formUpdate.touched.oldPassword ? formUpdate.errors.oldPassword : ""
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="password"
          label="New password"
          variant="outlined"
          name="password"
          type="password"
          onChange={formUpdate.handleChange}
          onBlur={formUpdate.handleBlur}
          value={formUpdate.values.password}
          fullWidth
          error={
            formUpdate.touched.password &&
            formUpdate.errors.password !== undefined
          }
          helperText={
            formUpdate.touched.password ? formUpdate.errors.password : ""
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="confirmPassword"
          label="Confirm password"
          variant="outlined"
          type="password"
          name="confirmPassword"
          value={formUpdate.values.confirmPassword}
          onChange={formUpdate.handleChange}
          onBlur={formUpdate.handleBlur}
          fullWidth
          error={
            formUpdate.touched.confirmPassword &&
            formUpdate.errors.confirmPassword !== undefined
          }
          helperText={
            formUpdate.touched.confirmPassword
              ? formUpdate.errors.confirmPassword
              : ""
          }
        />
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
          sx={{ marginTop: 4 }}
        >
          Change password
        </LoadingButton>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default FormChangePassword;
