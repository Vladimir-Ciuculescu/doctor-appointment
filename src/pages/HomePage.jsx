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

const drawerWidth = 240;

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const HomePage = () => {
  return (
    <Grid
      mt={20}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <tet>Page</tet>
    </Grid>
  );
};

export default HomePage;
