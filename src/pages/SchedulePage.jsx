import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { db } from "../firebase";
import { useSelector } from "react-redux";

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

const SchedulePage = () => {
  const { email } = useSelector((state) => state.userReducer);

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
      console.log(docRef.data());
    };

    getTodaySchedule();
  }, []);

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
        <h1>{todaySchedule}</h1>
      </Box>
    </Grid>
  );
};

export default SchedulePage;
