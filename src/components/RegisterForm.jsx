import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  ItemField,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  ItemAlign: "center",
  color: theme.palette.Item.secondary,
}));

const RegisterForm = () => {
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
      <Card sx={{ width: "20%" }}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            Register account{" "}
          </Typography>
          <Grid
            container
            spacing={0}
            rowSpacing={2}
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="Name"
                label="Name"
                variant="outlined"
                type="password  "
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="Surname"
                label="Surname"
                variant="outlined"
                type="password  "
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="email"
                label="Email"
                variant="outlined"
                type="password  "
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="password"
                label="Password"
                variant="outlined"
                type="password  "
              />
            </Grid>
          </Grid>
          <Grid mx={2} mt={2}>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Typography textAlign="center">
                Already have an account ?, Login here{" "}
              </Typography>
            </Link>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RegisterForm;
