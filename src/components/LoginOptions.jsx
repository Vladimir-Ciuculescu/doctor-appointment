import React from "react";
import { Box, Grid } from "@mui/material";
import AuthenticateCard from "./AuthenticateCard";

const LoginOptions = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box mt={10} mx="auto" sx={{ width: "40%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <AuthenticateCard
              text="Login as a doctor"
              image="https://www.pngitem.com/pimgs/m/413-4131087_line-art-head-okay-cartoon-doctor-image-png.png"
              content="Doctors can see their patient's appointments"
              path="/login"
            />
          </Grid>
          <Grid item xs={6}>
            <AuthenticateCard
              text="Login as a patient"
              image="https://cdn9.pngable.com/22/3/18/h3YEd4fmsV/hospital-drawing-patient.jpg"
              content="A patient can make an appointemnt to a doctor, and give feedback to it"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginOptions;
