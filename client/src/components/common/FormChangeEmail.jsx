import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { inputStyledBlack } from "../../utils/InputStyle";
import { validationForm } from "../../utils/ValidationForm";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const FormChangeEmail = ({ email }) => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const formUpdate = useFormik({
    initialValues: {
      oldEmail: email,
      newEmail: "",
      password: "",
    },
    validationSchema: validationForm.changeEmail,

    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.changeEmail(values);
      setIsLoginRequest(false);
      if (response) {
        formUpdate.resetForm();
        toast.success("Email updated");
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
          id="oldEmail"
          label="Email"
          variant="outlined"
          name="oldEmail"
          value={formUpdate.values.oldEmail}
          onChange={formUpdate.handleChange}
          onBlur={formUpdate.handleBlur}
          fullWidth
          disabled
          error={
            formUpdate.touched.oldEmail &&
            formUpdate.errors.oldEmail !== undefined
          }
          helperText={
            formUpdate.touched.oldEmail ? formUpdate.errors.oldEmail : ""
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="newEmail"
          label="NewEmail"
          variant="outlined"
          name="newEmail"
          value={formUpdate.values.newEmail}
          onChange={formUpdate.handleChange}
          onBlur={formUpdate.handleBlur}
          fullWidth
          error={
            formUpdate.touched.newEmail &&
            formUpdate.errors.newEmail !== undefined
          }
          helperText={
            formUpdate.touched.newEmail ? formUpdate.errors.newEmail : ""
          }
        />
        <TextField
          sx={inputStyledBlack}
          id="password"
          label="Password"
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

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
          sx={{ marginTop: 4 }}
        >
          Change Email
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

export default FormChangeEmail;
