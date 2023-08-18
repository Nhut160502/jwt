import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/register",
      user
    );
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed);
  }
};

export const getAllUser = async (token, dispatch) => {
  dispatch(getUsersStart());
  const res = await axios.get("http://localhost:8080/api/v1/user", {
    headers: { token: `Bearer ${token}` },
  });
  dispatch(getUsersSuccess(res.data));
  try {
  } catch (error) {
    dispatch(getUsersFailed());
  }
};
