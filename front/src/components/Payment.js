import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Background from "../../../back/public/static/images/Register.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { recargarSaldo, limpiarPago } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "./Stepper";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const dispatch = useDispatch();
  const [documento, setDocumento] = React.useState(null);
  const [nombre, setNombre] = React.useState(null);
  const [monto, setMonto] = React.useState(0);
  const [celular, setCelular] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [exito, setExito] = React.useState(null);
  const [redirect, setRedirect] = React.useState(null);
  const saldoStatus = useSelector((store) => store.userReducer.user.saldo);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseExito = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setExito(false);
  };

  const validarEmail = () => {
    if (email.includes("@") && email.includes(".")) {
      return true;
    } else {
      return false;
    }
  };

  const validarNombre = () => {
    if (nombre.length >= 6) {
      return true;
    } else {
      return false;
    }
  };

  const validarDocumento = () => {
    if (documento != null) {
      return true;
    } else {
      return false;
    }
  };

  const validarCelular = () => {
    if (celular != null) {
      return true;
    } else {
      return false;
    }
  };

  const checkUserData = () => {
    if (validarCelular()) {
      if (validarDocumento()) {
        if (monto > 0) {
          dispatch(recargarSaldo(documento, celular, monto));
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(limpiarPago());
    };
  }, [saldoStatus, redirect]);

  return (
    <div
      className="loginContainer"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {redirect ? (
        <Redirect to={"/"} />
      ) : (
        <>
          <div className="gridLogin">
            <div className="paymentBox">
              <Stepper />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
