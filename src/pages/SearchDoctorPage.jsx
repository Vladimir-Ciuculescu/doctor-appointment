import React, { useEffect, useState } from "react";
import { Grid, Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";

const SearchDoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [input, setInput] = useState("");

  const getAllDoctors = async () => {
    const q = query(collection(db, "doctors"));
    const docs = await getDocs(q);

    docs.docs.map((item) => {
      setDoctors((oldDoctors) => [
        ...oldDoctors,

        item.data().displayName.toLowerCase(),
      ]);
    });
  };

  const getFilteredDoctors = async () => {
    const filteredNames = doctors.filter((item) => item.includes(input));

    const q = query(
      collection(db, "doctors"),
      where("displayName", "in", filteredNames)
    );
    const docs = await getDocs(q);

    setFilteredDoctors([]);

    docs.docs.map((item) => {
      console.log(item.data());
      setFilteredDoctors((oldFiltered) => [
        ...oldFiltered,
        {
          displayName: item.data().displayName,
          email: item.data().email,
          specialization: item.data().specialization,
          phoneNumber: item.data().phoneNumber,
          costPerSession: item.data().costPerSession,
          gender: item.data().gender,
        },
      ]);
    });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    if (input === "") {
      setFilteredDoctors([]);
      return;
    }
    getFilteredDoctors();
  }, [input]);

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
      <Paper
        component="form"
        sx={{
          position: "fixed",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Doctor"
          inputProps={{ "aria-label": "search google maps" }}
          value={input}
          onChange={(e) => setInput(e.target.value.toLowerCase())}
        />
        <IconButton
          disabled
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box mt={10} sx={{ alignItems: "center", width: "60%" }}>
        <Grid
          alignItems="center"
          justify="center"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {filteredDoctors.map((item) => (
            <Grid item xs={6}>
              <DoctorCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default SearchDoctorPage;
