import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

export const signin = (formData, navigate, setErrorMsg) => async (dispatch) => {
  try {
    //login the user...
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    setErrorMsg("Invalid username & password !");
    console.log(error);
  }
};

export const signup = (formData, navigate, setErrorMsg) => async (dispatch) => {
  try {
    //sign in the user...
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    setErrorMsg("User already exists !");
    console.log(error);
  }
};
