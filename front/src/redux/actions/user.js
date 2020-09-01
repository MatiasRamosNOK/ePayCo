import axios from "axios";
import {
  REGISTER_USER,
  CLEAN_REGISTER,
  AGREGAR_SALDO,
  CONSULTAR_SALDO,
} from "../constants";

const registerUser = function (usuarioRegistrado) {
  return {
    type: REGISTER_USER,
    usuarioRegistrado,
  };
};

const reloadSaldo = function (data) {
  return {
    type: AGREGAR_SALDO,
    data,
  };
};

const consultaSaldo = function (monto) {
  return {
    type: CONSULTAR_SALDO,
    monto,
  };
};

export const cleanRegister = () => ({
  type: CLEAN_REGISTER,
});

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
        console.log("Resp:", res);
        if (res.status == 200) {
          dispatch(registerUser(true));
        } else {
          dispatch(registerUser(-1));
        }
      });
  };
};

export const recargarSaldo = function (documento, celular, valor) {
  return function (dispatch) {
    axios
      .post(`/users/reload`, {
        documento: documento,
        celular: celular,
        monto: valor,
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch(consultaSaldo(res.data));
        } else if (res.status == 205) {
          dispatch(reloadSaldo(-1));
        }
      });
  };
};

export const consultarSaldo = function (documento, celular) {
  return function (dispatch) {
    axios
      .post(`/users/obtenerSaldo`, {
        documento: documento,
        celular: celular,
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch(reloadSaldo(true));
        } else if (res.status == 205) {
          dispatch(reloadSaldo(-1));
        }
      });
  };
};
