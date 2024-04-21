import { createSlice } from "@reduxjs/toolkit";

export const infoModalSlice = createSlice({
  name: "ModalInfo",
  initialState: {
    mediaId: undefined,
    isOpen: false,
    mediaType: undefined,
  },
  reducers: {
    setOpenModal: (state, action) => {
      console.log(action);
      state.isOpen = true;
      state.mediaId = action.payload?.mediaId;
      state.mediaType = action.payload?.mediaType;
    },
    setCloseModal: (state) => {
      state.isOpen = false;
      state.mediaId = undefined;
      state.mediaType = undefined;
    },
  },
});

export const { setOpenModal, setCloseModal } = infoModalSlice.actions;

export default infoModalSlice.reducer;
