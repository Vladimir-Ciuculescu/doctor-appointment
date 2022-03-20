import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Slide,
  Zoom,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker, TimePicker } from "@mui/lab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DoctorSlots from "../components/DocotorSlots";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toggleModal } from "../redux/modal/modal";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const dispatch = useDispatch();
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <IconButton
        aria-label="close"
        onClick={() => dispatch(toggleModal(false))}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

const BookModal = () => {
  const dispatch = useDispatch();
  const { hidden } = useSelector((state) => state.modalReducer);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [toggleSlots, setToggleSlots] = useState(false);
  const [bookDate, setBookDate] = useState("");

  const selectBookingDate = (e) => {
    setDatePickerValue(e);
  };

  return (
    <BootstrapDialog
      fullWidth
      maxWidth={toggleSlots ? "md" : "sm"}
      aria-labelledby="customized-dialog-title"
      open={hidden}
    >
      <BootstrapDialogTitle id="customized-dialog-title">
        Please select the day and hour
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {toggleSlots ? (
          <>
            <DoctorSlots
              bookDate={`${datePickerValue.getDate()} ${
                monthNames[datePickerValue.getMonth()]
              } ${datePickerValue.getFullYear()}`}
            />
          </>
        ) : (
          <Grid
            mt={10}
            container
            spacing={2}
            columnSpacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item>
                <DesktopDatePicker
                  minDate={new Date()}
                  label="Day"
                  inputFormat="MM/dd/yyyy"
                  value={datePickerValue}
                  onChange={(e) => selectBookingDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setToggleSlots(true)}
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  disabled={datePickerValue ? false : true}
                >
                  Next
                </Button>
              </Grid>
            </LocalizationProvider>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {toggleSlots ? (
          <Button
            onClick={() => {
              setDatePickerValue(null);
              setToggleSlots(false);
            }}
            variant="contained"
            sx={{ mr: 100 }}
            autoFocus
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        ) : null}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default BookModal;
