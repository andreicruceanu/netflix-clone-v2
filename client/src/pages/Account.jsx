import React, { useEffect, useRef, useState } from "react";
import uiConfigs from "../configs/ui.configs";
import { Box, Stack } from "@mui/system";
import Container from "../components/common/Container";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../api/modules/user.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { Alert, TextField, Typography } from "@mui/material";
import DefaultAvatar from "../assets/images/default-blue.png";
import { styled } from "@mui/material/styles";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { inputStyledBlack } from "../utils/InputStyle";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { validationForm } from "../utils/ValidationForm";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/userSlice";
import EditIcon from "@mui/icons-material/Edit";
import ModalDefault from "../components/common/ModalDefaut";
import FormChangePassword from "../components/common/FormChangePassword";
import FormChangeEmail from "../components/common/FormChangeEmail";
const actionModal = {
  changePassword: "password",
  changeEmail: "email",
};

const Account = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  const updateForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: null,
    },

    validationSchema: validationForm.updateProfileUser,

    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.updateProfileUser(values);
      setIsLoginRequest(false);
      if (response) {
        toast.success("Data updated successfully!");
        dispatch(setUser(response));
      }
      if (err) {
        toast.error(err.message);
        setErrorMessage(err.message);
      }
    },
  });

  const fileRef = useRef(null);

  useEffect(() => {
    const getUserProfile = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));
      if (response) {
        const { firstName, lastName, email, profilePicture } = response;
        updateForm.setValues({ firstName, lastName, email, profilePicture });
      }
      if (err) {
        toast.error(err.message);
      }
    };
    getUserProfile();
  }, [dispatch]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = `avatars/${new Date().getTime() + image.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          updateForm.setValues((values) => ({
            ...values,
            profilePicture: downloadURL,
          }))
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);

  const handleModal = (action) => {
    setAction(action);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <ModalDefault open={open} onClose={onClose} action={action}>
        {action === actionModal.changePassword && <FormChangePassword />}
        {action === actionModal.changeEmail && (
          <FormChangeEmail email={updateForm.values.email} />
        )}
      </ModalDefault>
      <Container header={"My Account"}>
        <Box
          onSubmit={updateForm.handleSubmit}
          component="form"
          sx={{ maxWidth: "450px", display: "flex" }}
        >
          <Box sx={{ mr: 2 }}>
            <Box sx={{ width: "100px", position: "relative" }}>
              <VisuallyHiddenInput
                accept="image/*"
                id="uploadFile"
                type="file"
                ref={fileRef}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Box
                component={"img"}
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                src={updateForm.values?.profilePicture || DefaultAvatar}
                alt="avatar"
                onClick={() => fileRef.current.click()}
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  cursor: "pointer",
                  right: "5px",
                  bottom: "10px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zindex: -99,
                }}
                onClick={() => fileRef.current.click()}
              >
                <EditIcon sx={{ fontSize: "14px", color: "white" }} />
              </Box>
            </Box>

            <Typography>
              {imageError ? (
                <Typography>
                  Error uploading image (file size must be less than 2 MB)
                </Typography>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span>{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span>Uploaded succesfully</span>
              ) : (
                ""
              )}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack spacing={3}>
              <TextField
                sx={inputStyledBlack}
                id="firstName"
                label="FirstName"
                variant="outlined"
                name="firstName"
                onChange={updateForm.handleChange}
                value={updateForm.values.firstName}
                onBlur={updateForm.handleBlur}
                helperText={
                  updateForm.touched.firstName
                    ? updateForm.errors.firstName
                    : ""
                }
                error={
                  updateForm.touched.firstName &&
                  updateForm.errors.firstName !== undefined
                }
              />
              <TextField
                sx={inputStyledBlack}
                id="LastName"
                label="LastName"
                name="lastName"
                variant="outlined"
                onChange={updateForm.handleChange}
                value={updateForm.values.lastName}
                onBlur={updateForm.handleBlur}
                helperText={
                  updateForm.touched.lastName ? updateForm.errors.lastName : ""
                }
                error={
                  updateForm.touched.lastName &&
                  updateForm.errors.lastName !== undefined
                }
              />
              <TextField
                sx={inputStyledBlack}
                id="Email"
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                disabled
                onBlur={updateForm.handleBlur}
                onChange={updateForm.handleChange}
                value={updateForm.values.email}
                helperText={
                  updateForm.touched.email ? updateForm.errors.email : ""
                }
                error={
                  updateForm.touched.email &&
                  updateForm.errors.email !== undefined
                }
                InputProps={{
                  endAdornment: (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "white",
                        cursor: "pointer",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      onClick={() => handleModal(actionModal.changeEmail)}
                    >
                      Change
                    </Typography>
                  ),
                }}
              />
              <TextField
                sx={inputStyledBlack}
                id="Password"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value="***********"
                disabled
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "white",
                        cursor: "pointer",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      onClick={() => handleModal(actionModal.changePassword)}
                    >
                      Change
                    </Typography>
                  ),
                }}
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
              Save
            </LoadingButton>
            {errorMessage && (
              <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined">
                  {errorMessage}
                </Alert>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
