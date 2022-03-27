import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  Toolbar,
  Box,
  ListItemText,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UndoIcon from "@mui/icons-material/Undo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Menu = () => {
  const { user, userType } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  if (user) {
    console.log(userType);
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {userType === "pacient" ? (
            <List>
              <ListItem onClick={() => navigate("/home")} button key={1}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Personal Details" />
              </ListItem>
              <ListItem onClick={() => navigate("/search")} button key={2}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Search Doctor" />
              </ListItem>
              <ListItem
                onClick={() => navigate("/appointment-status")}
                button
                key={3}
              >
                <ListItemIcon>
                  <BookOnlineIcon />
                </ListItemIcon>
                <ListItemText primary="Your appointments  " />
              </ListItem>
              <ListItem button key={4}>
                <ListItemIcon>
                  <UndoIcon />
                </ListItemIcon>
                <ListItemText primary="Previous Appointments" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem onClick={() => navigate("/schedule")} button key={1}>
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Today Schedule" />
              </ListItem>

              <ListItem
                onClick={() => navigate("/appointment-status")}
                button
                key={3}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Personal Details" />
              </ListItem>
              <ListItem button key={4}>
                <ListItemIcon>
                  <UndoIcon />
                </ListItemIcon>
                <ListItemText primary="Previous Appointments" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    );
  } else {
    return null;
  }
};

export default Menu;
