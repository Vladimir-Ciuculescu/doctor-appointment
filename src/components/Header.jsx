import React from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Medlife from "../assets/MedLife.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/user/user";

const Header = () => {
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignOut = () => {
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="fixed"
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Avatar
              href
              style={{ flex: 1 }}
              sx={{ width: 64, height: 64 }}
              variant="square"
              alt="MedLife"
              src={Medlife}
            />
          </Link>
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={{ mr: 5 }}>
            <Typography sx={{ mt: 0.5 }}>{user.user}</Typography>
          </Box>
          {user.user ? (
            <Button variant="contained" color="info" onClick={() => SignOut()}>
              Sign out
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
