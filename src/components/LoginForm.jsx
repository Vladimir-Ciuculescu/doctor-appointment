import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  Alert,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserType, setEmail } from "../redux/user/user";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

const LoginForm = () => {
  const [mail, setMail] = useState("");
  const [alert, setAlert] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logIn = async () => {
    //dispatch(setUser);

    const docRef = await db.collection("doctors").doc(mail).get();

    if (docRef.exists) {
      if (docRef.data().email === mail && docRef.data().password === password) {
        dispatch(setUser(docRef.data().displayName));
        dispatch(setUserType("doctor"));
        dispatch(setEmail(docRef.data().email));
        navigate("/home");
      } else {
        setMessageError("Credentials not valid !");
        setAlert(true);
      }
    } else {
      setMessageError("This account does not exist !");
      setAlert(true);
    }
  };

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
              <TextField
                id="email"
                label="email"
                variant="outlined"
                onChange={(e) => setMail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                mt={10}
                id="password"
                label="password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
            <LoadingButton
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={() => logIn()}
              disabled={mail === "" || password === "" ? true : false}
            >
              Login
            </LoadingButton>
          </Grid>
        </CardActions>
      </Card>
      <Box mt={5}>
        <Collapse in={alert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {messageError}
          </Alert>
        </Collapse>
      </Box>
    </Grid>
  );
};

export default LoginForm;
