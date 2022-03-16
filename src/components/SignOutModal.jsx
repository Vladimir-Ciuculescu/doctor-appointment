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
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={false}>
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
              <Button variant="contained">Yes</Button>
            </Grid>
            <Grid item>
              <Button variant="contained">No</Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignOutModal;
