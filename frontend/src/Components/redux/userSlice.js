import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: null,
    },
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.allUsers = action.payload;
      state.users.isFetching = false;
    },
    getUsersFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = action.payload;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailed } =
  userSlice.actions;

export default userSlice.reducer;
