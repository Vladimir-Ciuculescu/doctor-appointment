import React from "react";
import { Grid, Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";

const SearchDoctorPage = () => {
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
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Doctor"
          inputProps={{ "aria-label": "search google maps" }}
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
      <Box
        mt={10}
        sx={{ alignItems: "center", backgroundColor: "red", width: "60%" }}
      >
        <Grid
          alignItems="center"
          justify="center"
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6}>
            <DoctorCard />
          </Grid>
          <Grid item xs={6}>
            <DoctorCard />
          </Grid>
          <Grid item xs={6}>
            <DoctorCard />
          </Grid>
          <Grid item xs={6}>
            <DoctorCard />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SearchDoctorPage;
