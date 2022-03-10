import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const AuthenticateCard = ({ image, text, content }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
        <Typography height={50} variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ mx: "auto" }}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Log in
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default AuthenticateCard;
