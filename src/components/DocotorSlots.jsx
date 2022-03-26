import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Button, Typography, Chip, TablePagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { LoadingButton } from "@mui/lab";
import firebase from "firebase";
import { toggleModal, toggleBookingModal } from "../redux/modal/modal";

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

const DoctorSlots = ({ bookDate, slots }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { doctor } = useSelector((state) => state.doctorReducer);
  const { email } = useSelector((state) => state.userReducer);

  const { bookingModal } = useSelector((state) => state.modalReducer);

  console.log(email);

  const makeAppointment = async (slot) => {
    setLoading(true);

    const docRef = await db
      .collection("pacients")
      .doc(email)
      .collection("appointments")
      .doc(bookDate)
      .get();

    if (!docRef.exists) {
      await db
        .collection("pacients")
        .doc(email)
        .collection("appointments")
        .doc(bookDate)
        .set({ slots: [slot] });
    } else {
      const pacientsSlots = docRef.data().slots;
      if (pacientsSlots.includes(slot)) {
        console.log("You cannot make 2 appointments in the same day");
      } else {
        await db
          .collection("pacients")
          .doc(email)
          .collection("appointments")
          .doc(bookDate)
          .update({
            slots: firebase.firestore.FieldValue.arrayUnion(slot),
          });

        await db
          .collection("doctors")
          .doc(doctor)
          .collection("appointments")
          .doc(bookDate)
          .update({
            slots: firebase.firestore.FieldValue.arrayUnion(slot),
          });
      }
    }

    setLoading(false);

    dispatch(toggleBookingModal(true));
  };

  if (bookingModal) {
    return <text>Reservation Complete</text>;
  } else
    return (
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      type="submit"
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
    );
};

export default DoctorSlots;
