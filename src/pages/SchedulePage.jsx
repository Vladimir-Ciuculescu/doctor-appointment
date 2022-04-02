import React, { useState, useEffect } from "react";
import { Grid, Box, DialogContent } from "@mui/material";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import {
  TableCell,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import firebase from "firebase";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SchedulePage = () => {
  const { user, email } = useSelector((state) => state.userReducer);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [slot, setSlot] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const todaySchedule =
    new Date().getDate() +
    " " +
    monthNames[new Date().getMonth()] +
    " " +
    new Date().getFullYear();

  useEffect(() => {
    const getTodaySchedule = async () => {
      const docRef = await db
        .collection("doctors")
        .doc(email)
        .collection("appointments")
        .doc(todaySchedule)
        .get();

      setTodayAppointments(docRef.data().slots);
    };

    getTodaySchedule();
  }, []);

  const updateStatus = async () => {
    await db
      .collection("doctors")
      .doc(email)
      .collection("appointments")
      .doc(todaySchedule)
      .update({
        slots: firebase.firestore.FieldValue.arrayRemove({
          name: name,
          slot: slot,
          status: "pending",
        }),
      });

    await db
      .collection("doctors")
      .doc(email)
      .collection("appointments")
      .doc(todaySchedule)
      .update({
        slots: firebase.firestore.FieldValue.arrayUnion({
          name: name,
          slot: slot,
          status: status,
        }),
      });

    const result = await db
      .collection("pacients")
      .where("name", "==", name)
      .get();

    result.forEach(async (doc) => {
      await db
        .collection("pacients")
        .doc(doc.id)
        .collection("appointments")
        .doc(todaySchedule)
        .update({
          date: todaySchedule,
          doctor: user,
          slot: slot,
          status: status,
        });
    });

    setToggleModal(false);

    window.location.reload(false);
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
      <Box mt={-0.5} ml={5} sx={{ width: "60%", position: "fixed" }}>
        {todayAppointments && todayAppointments.length > 0 ? (
          <>
            <h2>{todaySchedule}</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Time </StyledTableCell>
                    <StyledTableCell>Pacient name</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayAppointments.map((row) => (
                    <StyledTableRow
                      key={row.slot}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell>{row.slot}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          label={row.status}
                          color={
                            row.status === "pending"
                              ? "primary"
                              : row.status === "cancelled"
                              ? "error"
                              : "success"
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.status === "pending" ? (
                          <IconButton
                            onClick={() => {
                              setToggleModal(true);
                              setSlot(row.slot);
                              setName(row.name);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        ) : null}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <h2>There are no appointments for today</h2>
        )}
      </Box>
      <Dialog open={toggleModal}>
        <DialogTitle>
          Update status appointment{" "}
          <IconButton
            aria-label="close"
            onClick={() => setToggleModal(false)}
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Update status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Update status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => updateStatus()}
          >
            Save
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default SchedulePage;
