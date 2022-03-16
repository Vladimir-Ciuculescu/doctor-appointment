import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
      <Card sx={{ width: "300px" }}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            Log in
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            rowSpacing={2}
          >
            <Grid item xs={6}>
              <TextField id="username" label="username" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="password"
                label="password"
                variant="outlined"
                type="password  "
              />
            </Grid>
          </Grid>
          <Grid mx={2} mt={2}>
            <Link style={{ textDecoration: "none" }} to="/register">
              {`Don't have an account yet, \nSign Up here`}{" "}
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
              Login
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LoginForm;
