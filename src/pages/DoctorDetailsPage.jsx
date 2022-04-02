import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";

import { useSelector } from "react-redux";

const DoctorDetails = () => {
  const { user, email } = useSelector((state) => state.userReducer);

  const name = user.split(" ");
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
      <Box mt={-0.5} sx={{ width: "40%", position: "fixed" }}>
        <Card sx={{ minHeight: 190, minWidth: 275, display: "flex" }}>
          <Box sx={{ minWidth: "60%" }}>
            <CardContent>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {"Name: " + name[0]}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {"Surname: " + name[1]}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {"Email: " + email}
              </Typography>
            </CardContent>
          </Box>

          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              sx={{ width: "70%", height: "80%", mt: 1 }}
              image={require("../assets/doctorProfile.png")}
              alt="Live from space album cover"
            />
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default DoctorDetails;
