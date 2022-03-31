import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: "general",
  initialState: {
    toggle: false,
    user: null,
    modal: false,
    image: null,
  },
  reducers: {
    sidebarToggle: (state, action) => {
      state.toggle = !state.toggle;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setImage: (state, action) => {
      state.image = null;
      state.image = action.payload;
    },
    toggleModal: (state, action) => {
      state.modal = !state.modal;
    },
  },
});
export const { sidebarToggle, setUser, setImage, toggleModal } =
  GeneralSlice.actions;
export default GeneralSlice.reducer;
