import React, { useEffect, useRef, useState } from "react";
import uiConfigs from "../configs/ui.configs";
import { Box } from "@mui/system";
import Container from "../components/common/Container";
import { useDispatch } from "react-redux";
import userApi from "../api/modules/user.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { TextField, Typography } from "@mui/material";
import DefaultAvatar from "../assets/images/default-blue.png";
import { styled } from "@mui/material/styles";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const Account = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({});

  console.log(formData);

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));
      if (response) {
        setUserProfile(response);
      }
      if (err) {
        console.log(err);
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
          setFormData({ ...formData, profilePicture: downloadURL })
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

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={"My Account"}>
        <Box component="form">
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            ref={fileRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={
              formData.profilePicture ||
              userProfile.profilePicture ||
              DefaultAvatar
            }
            alt="avatar"
            width={50}
            onClick={() => fileRef.current.click()}
          />
          <Typography>
            {imageError ? (
              <Typography>
                Error uploading image (file size must be less than 2 MB)
              </Typography>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span>{`Uploading: + ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span>Uploaded succesfully</span>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
