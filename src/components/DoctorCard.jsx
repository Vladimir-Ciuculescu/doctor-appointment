import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const DoctorCard = () => {
  return (
    <Card sx={{ minHeight: 200, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Doctor Name : Marian
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Specializare
        </Typography>
        <Typography sx={{ mt: 1 }} color="text.secondary">
          Phone number
        </Typography>
        <Typography sx={{ mt: 1 }} color="text.secondary">
          Feed per session
        </Typography>
      </CardContent>
      <CardActions
        sx={{ mb: 5, pr: 5, display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="primary" type="submit" variant="contained" size="large">
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;
