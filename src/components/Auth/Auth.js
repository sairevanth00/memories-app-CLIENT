import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import Icon from "./icon";
// import { GoogleLogin } from "react-google-login";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from "./Input";
import { signup, signin } from "../../actions/auth";
// import { isError } from "../../actions/auth";
import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate, setErrorMsg)); //.error((e) => setErrorMsg(e.message));
    } else {
      dispatch(signin(formData, navigate, setErrorMsg));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const googleSuccess = (res) => {
  //   console.log(res);
  // };
  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign In was unsuccessful. Try Again Later");
  // };
  const handleCallbackResponse = async (res) => {
    var userObject = jwt_decode(res.credential);
    const result = {
      email: userObject.email,
      familyName: userObject.family_name,
      givenName: userObject.given_name,
      googleId: userObject.jti,
      imageUrl: userObject.picture,
      name: userObject.name,
    };
    const token = res?.credential;
    // console.log("objResult : " + result);
    // console.log("token : " + token);

    // console.log("Encoded JWT ID token: " + res.credential);
    // console.log("userObject : " + userObject);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "373429104966-hqh71l7od8rfimgtk8otudt0pgca7qji.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      type: "standard",
      shape: "rectangular",
      width: "362",
    });
  }, [handleCallbackResponse]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Typography
              variant="h5"
              style={{ color: "red", fontSize: "15px", paddingLeft: "10px" }}
            >
              {errorMsg}
            </Typography>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="373429104966-hqh71l7od8rfimgtk8otudt0pgca7qji.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="secondary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <div id="signInDiv">Google login</div>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode} color="secondary">
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
