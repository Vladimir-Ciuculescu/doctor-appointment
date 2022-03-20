import React from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/modal/modal";

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

const BookModal = () => {
  const dispatch = useDispatch();
  const { hidden } = useSelector((state) => state.modalReducer);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={hidden}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={hidden}>
        <Box sx={style}>
          <Typography
            align="center"
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            Book to this doctor ?
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
              <Button
                onClick={() => dispatch(toggleModal(false))}
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

export default BookModal;
