import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  InputBase,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/modal/modal";

import {
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import BookingModal from "../components/BookingModal";

const doctorTypes = [
  "Neurologist",
  "Psychiatrist",
  "Pediatrician",
  "Ophthalmologist",
  "Plastic surgeon",
  "Dermatologist",
  "Cardiologist",
  "Orthopedic surgeon",
  "Radiologist",
];

const SearchDoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [input, setInput] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getAllDoctors = async () => {
    const q = query(collection(db, "doctors"));
    const docs = await getDocs(q);

    docs.docs.map((item) => {
      setDoctors((oldDoctors) => [
        ...oldDoctors,

        item.data().displayName.toLowerCase(),
      ]);
      setFilteredDoctors((oldDoctors) => [
        ...oldDoctors,
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

  const getFilteredDoctors = async () => {
    setLoading(true);
    const filteredNames = doctors.filter((item) => item.includes(input));

    let q;

    if (specialization !== "" && input === "") {
      q = query(
        collection(db, "doctors"),
        where("specialization", "==", specialization)
      );
    } else if (specialization === "" && input !== "") {
      q = query(
        collection(db, "doctors"),

        where("displayName", "in", filteredNames)
      );
    } else if (specialization !== "" && input !== "") {
      q = query(
        collection(db, "doctors"),
        where("displayName", "in", filteredNames),
        where("specialization", "==", specialization)
      );
    }

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
    setLoading(false);
  };

  useEffect(() => {
    dispatch(toggleModal());
    getAllDoctors();
  }, []);

  useEffect(() => {
    getFilteredDoctors();
  }, [input, specialization]);

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
        <FormControl sx={{ width: "22ch" }}>
          <InputLabel id="demo-simple-select-label">Specialization</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            label="Specialization"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {doctorTypes.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
      <BookingModal />
    </Grid>
  );
};

export default SearchDoctorPage;
