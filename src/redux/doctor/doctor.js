const GET_DOCTOR = "GET_DOCTOR";
const SET_DOCTOR_NAME = "SET_DOCTOR_NAME";

export const setDoctor = (doctor) => ({
  type: GET_DOCTOR,
  payload: doctor,
});

export const setDoctorName = (doctorName) => ({
  type: SET_DOCTOR_NAME,
  payload: doctorName,
});

const INITIAL_STATE = {
  doctor: "",
  doctorName: "",
};

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DOCTOR:
      return { ...state, doctor: action.payload };
    case SET_DOCTOR_NAME:
      return { ...state, doctorName: action.payload };
    default:
      return state;
  }
};

export default doctorReducer;
