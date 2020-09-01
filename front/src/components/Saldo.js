import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Background from "../../../back/public/static/images/Register.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { consultarSaldo } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
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
  const saldoMonto = useSelector((store) => store.userReducer.user.saldo);
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
        dispatch(consultarSaldo(documento, celular));
      }
    }
  };

  useEffect(() => {
    if (saldoMonto > 0) {
      setCelular("");
      setDocumento("");
      setMonto("");
    } else if (saldoMonto == -1) {
      setNombre("");
      setEmail("");
      setCelular("");
      setDocumento("");
      setError("Los datos son incorrectos");
      setOpen(true);
    }
  }, [saldoMonto, redirect]);

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
            <div className="reloadBox">
              <div
                style={{
                  marginTop: 10,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: "25px" }}>Documento</h3>

                <input
                  onChange={(e) => {
                    setDocumento(e.target.value);
                  }}
                  value={documento}
                  style={{
                    fontSize: 20,
                    border: "0px",
                    borderBottom: "1px solid black",
                  }}
                  type="number"
                  placeholder="Ingresar documento"
                />
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3 style={{ fontSize: "25px" }}>Celular</h3>

                <input
                  onChange={(e) => {
                    setCelular(e.target.value);
                  }}
                  value={celular}
                  style={{
                    fontSize: 20,
                    border: "0px ",
                    borderBottom: "1px solid black",
                  }}
                  type="number"
                  placeholder="Ingresar Celular"
                />
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 25,
                }}
              >
                <h3 style={{ fontSize: "25px" }}>Monto</h3>

                <input
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      console.log("Value:", e.target.value);
                      setMonto(0);
                    } else {
                      setMonto(e.target.value);
                    }
                  }}
                  disabled
                  value={saldoMonto}
                  style={{
                    fontSize: 20,
                    border: "0px ",
                    borderBottom: "1px solid black",
                  }}
                  type="number"
                />
              </div>

              <div className="contenedorBotonRegistrarse">
                <button
                  className="botonRegistrarse"
                  onClick={() => {
                    checkUserData();
                  }}
                >
                  Consultar saldo
                </button>
              </div>
            </div>
          </div>
          <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Snackbar
            open={exito}
            autoHideDuration={2500}
            onClose={handleCloseExito}
          >
            <Alert onClose={handleCloseExito} severity="success">
              El saldo fue agregado satisfactoriamente!
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
}
