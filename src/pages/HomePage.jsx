import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Link,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user, email } = useSelector((state) => state.userReducer);

  const name = user.split(" ");

  return (
    <Grid
      mt={10}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box mt={-0.5} sx={{ width: "60%", position: "fixed" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemText primary={"Name: " + name[0]} />
          </ListItem>
          <ListItem>
            <ListItemText primary={"Surname: " + name[1]} />
          </ListItem>
          <ListItem>
            <ListItemText primary={"Email: " + email} />
          </ListItem>
        </List>
      </Box>
    </Grid>
  );
};

export default HomePage;
