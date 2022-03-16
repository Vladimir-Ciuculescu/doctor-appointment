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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import UndoIcon from "@mui/icons-material/Undo";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const patientOptions = [
  "Personal Details",
  "Search Doctor",
  "Appointment Status",
  "Previous Appointments",
];

const Menu = () => {
  const user = useSelector((state) => state.userReducer);

  if (user.user) {
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
          <List>
            {patientOptions.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {text === "Personal Details" ? (
                    <PersonIcon />
                  ) : text === "Search Doctor" ? (
                    <LocalHospitalIcon />
                  ) : text === "Appointment Status" ? (
                    <BookOnlineIcon />
                  ) : (
                    <UndoIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    );
  } else {
    return null;
  }
};

export default Menu;
