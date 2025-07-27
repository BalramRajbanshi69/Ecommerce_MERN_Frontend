
import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { API } from "../http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [], 
    status: STATUSES.SUCCESS,
    token: "",
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logOut(state) {
      state.data = [];
      state.token = null;
      state.status = STATUSES.SUCCESS;
    },
  },
});

export const { setUser, setStatus, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;

// Register Thunk
export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/register", data);
      dispatch(setUser(response.data.user)); 
      dispatch(setStatus(STATUSES.SUCCESS));
      return response.data; 
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      throw new Error(
        error.response?.data?.message || "An unexpected error occurred during registration"
      );
    }
  };
}

// Login Thunk (unchanged, included for completeness)
export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setStatus(STATUSES.SUCCESS));
      localStorage.setItem("token", response.data.token);
    return response.data;
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      throw new Error(
        error.response?.data?.msg || "An unexpected error occurred during login"
      );
    }
  };
}