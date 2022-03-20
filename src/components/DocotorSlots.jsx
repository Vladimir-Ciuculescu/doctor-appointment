import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Button, Typography, Chip } from "@mui/material";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("08:00-08:30", "Available", "Book Now"),
  createData("08:30-09:00", "Available", "Book Now"),
  createData("09:00-09:30", "Available", "Book Now"),
  createData("09:30-10:00", "Available", "Book Now"),
  createData("10:00-10:30", "Available", "Book Now"),
];

const DoctorSlots = ({ bookDate }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Slots</Typography>
            </TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Reserve now</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Chip label="Available" color="success" />
              </TableCell>
              <TableCell align="right">
                <Button variant="contained">Book now</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorSlots;
