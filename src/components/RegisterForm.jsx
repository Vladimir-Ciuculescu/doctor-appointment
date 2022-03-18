import React, { Fragment, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Modal,
  Fade,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  Backdrop,
  Alert,
  Collapse,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EuroOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [costPerSession, setCostPerSession] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleDoctorExsitent, setToggleDoctorExistent] = useState(false);

  const RegisterDoctor = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "doctors"), where("email", "==", email));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await setDoc(doc(db, "doctors", email), {
          displayName: name + " " + surName,
          email: email,
          phoneNumber: phoneNumber,
          costPerSession: costPerSession,
          specialization: specialization,
          password: password,
        });

        setToggleModal(true);
      } else {
        setLoading(false);
        setToggleDoctorExistent(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Grid
        mt={10}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Box mt={7} mb={5}>
          <Collapse in={toggleDoctorExsitent}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setToggleDoctorExistent(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              This doctor is already registered !
            </Alert>
          </Collapse>
        </Box>
        <Card sx={{ width: "30%" }}>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
            >
              Register account{" "}
            </Typography>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              rowSpacing={1}
            >
              <Grid item xs={6}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  mt={10}
                  id="Name"
                  label="Name"
                  variant="outlined"
                  type="password  "
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={surName}
                  onChange={(e) => setSurName(e.target.value)}
                  mt={10}
                  id="Surname"
                  label="Surname"
                  variant="outlined"
                  type="password  "
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mt={10}
                  id="Email"
                  label="Email"
                  variant="outlined"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  mt={10}
                  id="Phone Number"
                  label="Phone Number"
                  variant="outlined"
                  type="password  "
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl sx={{ m: 1, width: "22ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Cost per session
                  </InputLabel>
                  <OutlinedInput
                    fullWidth={true}
                    value={costPerSession}
                    onChange={(e) => setCostPerSession(e.target.value)}
                    id="outlined-adornment-password"
                    type="number"
                    endAdornment={
                      <InputAdornment
                        disablePointerEvents={true}
                        position="end"
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <EuroOutlined />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="costPerSession"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: "22ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Specialization
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    label="Specialization"
                  >
                    {doctorTypes.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mt={10}
                  id="Password"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </Grid>
            </Grid>
            <Grid mx={2} mt={2}>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Typography textAlign="center">
                  Already have an account ?, Login here{" "}
                </Typography>
              </Link>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={() => RegisterDoctor()}
                loading={loading}
              >
                Sign Up
              </LoadingButton>
            </Grid>
          </CardActions>
        </Card>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={toggleModal}>
            <Box sx={style}>
              <Typography
                align="center"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Doctor Registration Succesfull !
              </Typography>
              <Grid
                sx={{ mt: 3 }}
                container
                columnSpacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                  >
                    Awesome
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </Fragment>
  );
};

export default RegisterForm;
