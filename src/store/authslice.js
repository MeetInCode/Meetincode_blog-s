import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: null,
  isAuthenticated: false,
};
const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("store updating222222");
      console.log(action.payload);
      state.userdata = action.payload.userdata;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userdata = null;
      state.isAuthenticated = false;
    },
  },
});

export default authslice.reducer;
export const { login, logout } = authslice.actions;
