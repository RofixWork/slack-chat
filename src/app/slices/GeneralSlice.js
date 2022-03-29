import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: "general",
  initialState: {
    toggle: false,
    user: null,
  },
  reducers: {
    sidebarToggle: (state, action) => {
      state.toggle = !state.toggle;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { sidebarToggle, setUser } = GeneralSlice.actions;
export default GeneralSlice.reducer;
