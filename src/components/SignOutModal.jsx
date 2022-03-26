import React from "react";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  Button,
  Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleSignOutModal } from "../redux/modal/modal";
import { removeUser } from "../redux/user/user";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SignOutModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signOutModal } = useSelector((state) => state.modalReducer);

  const signOut = () => {
    dispatch(toggleSignOutModal(false));
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={signOutModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={signOutModal}>
        <Box sx={style}>
          <Typography
            align="center"
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure you want to sign out ?
          </Typography>
          <Grid
            sx={{ mt: 3 }}
            container
            columnSpacing={2}
            justifyContent="center"
          >
            <Grid item>
              <Button variant="contained" onClick={() => signOut()}>
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => dispatch(toggleSignOutModal(false))}
                variant="contained"
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignOutModal;
