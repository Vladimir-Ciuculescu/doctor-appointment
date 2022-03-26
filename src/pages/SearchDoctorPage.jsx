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
import { toggleModal, toggleBookingModal } from "../redux/modal/modal";

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
  const { bookingModal } = useSelector((state) => state.modalReducer);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [input, setInput] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getAllDoctors = async () => {
    await db
      .collection("doctors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDoctors((oldDoctors) => [
            ...oldDoctors,
            doc.data().displayName.toLowerCase(),
          ]);
          setFilteredDoctors((oldDoctors) => [
            ...oldDoctors,
            {
              displayName: doc.data().displayName,
              email: doc.data().email,
              specialization: doc.data().specialization,
              phoneNumber: doc.data().phoneNumber,
              costPerSession: doc.data().costPerSession,
              gender: doc.data().gender,
            },
          ]);
        });
      });
  };

  const getFilteredDoctors = async () => {
    setLoading(true);
    const filteredNames = doctors.filter((item) => item.includes(input));

    const filteredCopies = filteredDoctors;

    let q;

    if (specialization !== "" && input === "") {
      q = await db
        .collection("doctors")
        .where("specialization", "==", specialization)
        .get();
    } else if (specialization === "" && input !== "") {
      q = await db
        .collection("doctors")
        .where("displayName", "in", filteredDoctors)
        .get();
    } else if (specialization !== "" && input !== "") {
      q = await db
        .collection("doctors")
        .where("displayName", "in", filteredNames)
        .where("specialization", "==", specialization)
        .get();
    } else if (specialization === "" && input === "") {
      q = await db.collection("doctors").get();
    }

    setFilteredDoctors([]);

    q.docs.forEach((doc) => {
      setFilteredDoctors((oldFiltered) => [
        ...oldFiltered,
        {
          displayName: doc.data().displayName,
          email: doc.data().email,
          specialization: doc.data().specialization,
          phoneNumber: doc.data().phoneNumber,
          costPerSession: doc.data().costPerSession,
          gender: doc.data().gender,
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
      <Box mt={-0.5} sx={{ width: "60%" }}>
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
