import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconButton,
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Chip,
  Alert,
  Box,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleBookingModal } from "../redux/modal/modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { LoadingButton } from "@mui/lab";
import { db } from "../firebase";
import firebase from "firebase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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

const allSlots = [
  "08:00-08:30",
  "08:30-09:00",
  "09:00-09:30",
  "09:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "12:00-12:30",
  "12:30-13:00",
  "13:00-13:30",
  "13:30-14:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
  "17:30-18:00",
];

const columns = [
  { name: "Slots", align: "left" },
  { name: "Status", align: "center" },
  { name: "Reservation", align: "right" },
];

const BookingModal2 = () => {
  const [loading, setLoading] = useState(false);
  const [toggleSlots, setToggleSlots] = useState(false);
  const [bookStatus, setBookStatus] = useState(false);

  const [bookDate, setBookDate] = useState(new Date());
  const [toggleAlert, setToggleAlert] = useState(false);

  const dispatch = useDispatch();
  const { user, email } = useSelector((state) => state.userReducer);
  const { hidden } = useSelector((state) => state.modalReducer);
  const { doctor, doctorName } = useSelector((state) => state.doctorReducer);

  const [slots, setSlots] = useState([]);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const getDaySlots = async () => {
    const docRef = await db
      .collection("doctors")
      .doc(doctor)
      .collection("appointments")
      .doc(
        `${bookDate.getDate()} ${
          monthNames[bookDate.getMonth()]
        } ${bookDate.getFullYear()}`
      )
      .get();

    if (!docRef.exists) {
      await db
        .collection("doctors")
        .doc(doctor)
        .collection("appointments")
        .doc(
          `${bookDate.getDate()} ${
            monthNames[bookDate.getMonth()]
          } ${bookDate.getFullYear()}`
        )
        .set({
          slots: [],
        });
      setSlots([]);
    } else {
      docRef.data().slots.map((item) => {
        setSlots((oldArray) => [...oldArray, item.slot]);
      });
      //setSlots(docRef.data().slots);
    }

    setToggleSlots(true);
  };

  const makeAppointment = async (slot) => {
    setLoading(true);

    const docRef = await db
      .collection("pacients")
      .doc(email)
      .collection("appointments")
      .doc(
        `${bookDate.getDate()} ${
          monthNames[bookDate.getMonth()]
        } ${bookDate.getFullYear()}`
      )
      .get();

    if (!docRef.exists) {
      await db
        .collection("pacients")
        .doc(email)
        .collection("appointments")
        .doc(
          `${bookDate.getDate()} ${
            monthNames[bookDate.getMonth()]
          } ${bookDate.getFullYear()}`
        )
        //.set({ slots: [slot] });
        .set({
          slot: slot,
          doctor: doctorName,
          date: `${bookDate.getDate()} ${
            monthNames[bookDate.getMonth()]
          } ${bookDate.getFullYear()}`,
        });

      await db
        .collection("doctors")
        .doc(doctor)
        .collection("appointments")
        .doc(
          `${bookDate.getDate()} ${
            monthNames[bookDate.getMonth()]
          } ${bookDate.getFullYear()}`
        )
        .update({
          slots: firebase.firestore.FieldValue.arrayUnion({
            name: user,
            slot: slot,
          }),
        });

      setLoading(false);
      setBookStatus(true);
    } else {
      setLoading(false);
      setToggleAlert(true);
    }
  };

  if (bookStatus) {
    return (
      <BootstrapDialog
        fullWidth
        maxWidth={toggleSlots ? "md" : "sm"}
        aria-labelledby="customized-dialog-title"
        open={hidden}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Appointment succesful
          <IconButton
            aria-label="close"
            onClick={() => {
              setBookStatus(false);
              setToggleSlots(false);
              dispatch(toggleModal(false));
            }}
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

        <DialogActions></DialogActions>
      </BootstrapDialog>
    );
  } else
    return (
      <BootstrapDialog
        fullWidth
        maxWidth={toggleSlots ? "md" : "sm"}
        aria-labelledby="customized-dialog-title"
        open={hidden}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {toggleSlots
            ? bookDate.getDate() + " " + monthNames[bookDate.getMonth()]
            : "Please select the day and time"}

          <IconButton
            aria-label="close"
            onClick={() => {
              dispatch(toggleModal(false));
              setToggleSlots(false);
              setToggleAlert(false);
              setBookDate(new Date());
            }}
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
        <DialogContent dividers>
          <Box mt={1} mb={2}>
            <Collapse in={toggleAlert}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setToggleAlert(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                You cannot make two appointments in the same day !
              </Alert>
            </Collapse>
          </Box>
          {toggleSlots ? (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column} align={column.align}>
                          {column.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allSlots.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {row}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={slots.includes(row) ? "Busy" : "Available"}
                            color={slots.includes(row) ? "error" : "success"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <LoadingButton
                            color="primary"
                            //type="submit"
                            onClick={() => makeAppointment(row)}
                            variant="contained"
                            loading={loading}
                            disabled={slots.includes(row) ? true : false}
                          >
                            Book now
                          </LoadingButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
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
                    onChange={(e) => setBookDate(e)}
                    value={bookDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      getDaySlots();
                    }}
                    //onClick={() => getDateSlots()}
                    variant="contained"
                    endIcon={<ArrowForwardIosIcon />}
                    //disabled={bookDate ? false : true}
                  >
                    Next
                  </Button>
                </Grid>
              </LocalizationProvider>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setBookDate(new Date());
              setToggleSlots(false);
            }}
            variant="contained"
            sx={{ mr: 100 }}
            autoFocus
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
};

export default BookingModal2;
