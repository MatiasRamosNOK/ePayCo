import axios from "axios";
import {
  REGISTER_USER,
  CLEAN_REGISTER,
  AGREGAR_SALDO,
  CONSULTAR_SALDO,
  REALIZAR_PAGO,
  LIMPIAR_PAGO,
  COMPROBAR_TOKEN,
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

const pagoRealizado = function (data) {
  return {
    type: REALIZAR_PAGO,
    data,
  };
};

const token = function (data) {
  return {
    type: COMPROBAR_TOKEN,
    data,
  };
};

export const limpiarPago = () => ({
  type: LIMPIAR_PAGO,
});

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
          dispatch(consultaSaldo(true));
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
          dispatch(reloadSaldo(res.data));
        } else if (res.status == 205) {
          dispatch(reloadSaldo(-1));
        }
      });
  };
};

export const realizarPago = function (idPago, documento, celular) {
  return function (dispatch) {
    axios
      .post(`/users/realizarPago`, {
        idPago: idPago,
        documento: documento,
        celular: celular,
      })
      .then((res) => {
        if (res.status == 200) {
          //En este caso los datos de pago son correctos, se pide el ID al usuario para poder avanzar
          dispatch(pagoRealizado("Correcto"));
        } else if (res.status == 207) {
          //En este caso el ID de pago es incorrecto
          dispatch(pagoRealizado("El ID de pago no existe"));
        } else if (res.status == 205) {
          //En este caso los datos de usuario son incorrectos
          dispatch(pagoRealizado("Datos de usuario incorrectos"));
        } else if (res.status == 206) {
          //En este caso el saldo no es suficiente
          dispatch(
            pagoRealizado("El saldo no es suficiente para realizar este pago")
          );
        }
      });
  };
};

export const comprobarToken = function (documento, codigoVerificacion) {
  return function (dispatch) {
    axios
      .post(`/users/comprobarToken`, {
        documento: documento,
        uniqueToken: codigoVerificacion,
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch(token(true));
        } else if (res.status == 201) {
          dispatch(token("Token invalido"));
        }
      });
  };
};
