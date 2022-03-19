import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  Box,
} from "@mui/material";
import doctor from "../assets/doctorProfile.png";

const DoctorCard = ({
  item: {
    displayName,
    email,
    gender,
    specialization,
    phoneNumber,
    costPerSession,
  },
}) => {
  return (
    <Card sx={{ minHeight: 190, minWidth: 275, display: "flex" }}>
      <Box sx={{ minWidth: "60%" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Specialization : {specialization}
          </Typography>
          <Typography sx={{ mt: 1 }} color="text.secondary">
            Phone number : {phoneNumber}
          </Typography>
          <Typography sx={{ mt: 1 }} color="text.secondary">
            Feed per session : {costPerSession} $
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
          image={
            gender === "male"
              ? require("../assets/doctorProfile.png")
              : require("../assets/doctoressProfile.png")
          }
          alt="Live from space album cover"
        />
        <CardActions>
          <Box
            width="100%"
            display="flex"
            bgcolor="lightgreen"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              color="primary"
              type="submit"
              variant="contained"
              size="medium"
            >
              Book
            </Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default DoctorCard;
