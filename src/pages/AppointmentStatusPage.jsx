import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Dialog,
  styled,
  Paper,
  IconButton,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { pink } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ApppointmentStatusPage = () => {
  const { email } = useSelector((state) => state.userReducer);

  const [appointments, setAppointments] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      const collectionRef = await db
        .collection("pacients")
        .doc(email)
        .collection("appointments")
        .get();

      collectionRef.forEach((doc) => {
        console.log(doc.data());
        setAppointments((oldArray) => [
          ...oldArray,
          {
            doctor: doc.data().doctor,
            slot: doc.data().slot,
            date: doc.data().date,
          },
        ]);
      });

      console.log(appointments);
    };
    getAppointments();
  }, []);

  const deleteAppointment = async () => {
    setLoading(true);
    await db
      .collection("pacients")
      .doc(email)
      .collection("appointments")
      .doc(slot)
      .delete();

    setLoading(false);
    setToggleModal(false);

    setAppointments(appointments.filter((item) => item.date !== slot));
  };

  return (
    <Grid
      mt={10}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box mt={-0.5} sx={{ width: "60%", position: "fixed" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time </TableCell>
                <TableCell>Doctor name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row) => (
                <TableRow
                  key={row.slot}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.date}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.slot}
                  </TableCell>
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setToggleModal(true);
                        setSlot(row.date);
                      }}
                    >
                      <DeleteForeverIcon sx={{ color: pink[500] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <BootstrapDialog
        fullWidth
        //maxWidth={toggleSlots ? "md" : "sm"}
        aria-labelledby="customized-dialog-title"
        open={toggleModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Do you want to delete this appointment ?
          <IconButton
            onClick={() => setToggleModal(false)}
            aria-label="close"
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

        <DialogActions>
          <Button
            onClick={() => setToggleModal(false)}
            variant="contained"
            autoFocus
          >
            No
          </Button>
          <LoadingButton
            onClick={() => deleteAppointment()}
            variant="contained"
            autoFocus
            loading={loading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
};

export default ApppointmentStatusPage;
