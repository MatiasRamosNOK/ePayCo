import axios from "axios";
import { REGISTER_USER } from "../constants";

const registerUser = function (usuarioRegistrado) {
  return {
    type: REGISTER_USER,
    usuarioRegistrado,
  };
};

export const sendRegisterUser = function (correo, nombre, documento, celular) {
  return function (dispatch) {
    axios
      .post(`/users/register`, {
        email: correo,
        nombres: nombre,
        documento: documento,
        celular: celular,
      })
      .then((res) => {
        dispatch(registerUser(true));
      });
  };
};
