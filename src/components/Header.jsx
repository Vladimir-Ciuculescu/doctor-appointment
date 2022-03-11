import React from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import Medlife from "../assets/MedLife.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Avatar
            href
            sx={{ width: 64, height: 64 }}
            variant="square"
            alt="MedLife"
            src={Medlife}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
