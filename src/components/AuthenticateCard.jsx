import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase";
import { db } from "../firebase";

import { useDispatch } from "react-redux";
import { setUser, setEmail, setUserType } from "../redux/user/user";

const AuthenticateCard = ({ image, text, content, path }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signInAsPacient = async () => {
    setLoading(true);
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.auth().signInWithPopup(googleProvider);

    const user = result.user;

    const existentAccount = await db
      .collection("pacients")
      .doc(user.email)
      .get();

    if (existentAccount.exists) {
    } else {
      await db
        .collection("pacients")
        .doc(user.email)
        .set({ uid: user.uid, name: user.displayName, email: user.email });
    }

    dispatch(setUser(user.displayName));
    dispatch(setUserType("pacient"));
    dispatch(setEmail(user.email));
    navigate("/home");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
        <Typography height={50} variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ mx: "auto" }}>
          {path ? (
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                Log in
              </Link>
            </Button>
          ) : (
            <LoadingButton
              size="large"
              onClick={signInAsPacient}
              loading={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Log in
            </LoadingButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default AuthenticateCard;
