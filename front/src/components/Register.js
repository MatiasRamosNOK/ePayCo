import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Background from "../../../back/public/static/images/Register.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { sendRegisterUser } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const dispatch = useDispatch();
  const [documento, setDocumento] = React.useState(null);
  const [nombre, setNombre] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [celular, setCelular] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [exito, setExito] = React.useState(null);
  const [redirect, setRedirect] = React.useState(null);
  const registroStatus = useSelector(
    (store) => store.userReducer.user.registroOk
  );
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
    if (validarEmail()) {
      if (validarNombre()) {
        if (validarDocumento()) {
          if (validarCelular()) {
            //En este punto esta todo bien
            dispatch(sendRegisterUser(email, nombre, documento, celular));
          } else {
            setError("Celular no valido");
            setOpen(true);
          }
        } else {
          setError("Documento no valido");
          setOpen(true);
        }
      } else {
        setError("Nombre no valido");
        setOpen(true);
      }
    } else {
      setError("Email no valido");
      setOpen(true);
    }
  };

  useEffect(() => {
    if (registroStatus == true) {
      setNombre("");
      setEmail("");
      setCelular("");
      setDocumento("");
      setExito(true);
      setTimeout(() => setRedirect(true), 2500);
    }
  }, [registroStatus, redirect]);

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
            <div className="registerBox">
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
                <h3 style={{ fontSize: "25px" }}>Nombres</h3>

                <input
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  value={nombre}
                  style={{
                    fontSize: 20,
                    border: "0px",
                    borderBottom: "1px solid black",
                  }}
                  type="text"
                  placeholder="Ingresar nombres"
                />

                {/* Aca va la contraseña*/}
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
                <h3 style={{ fontSize: "25px" }}>Email</h3>

                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  style={{
                    fontSize: 20,
                    border: "0px ",
                    borderBottom: "1px solid black",
                  }}
                  type="email"
                  placeholder="Ingresar Email"
                />
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
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

              <div className="contenedorBotonRegistrarse">
                <button
                  className="botonRegistrarse"
                  onClick={() => {
                    checkUserData();
                  }}
                >
                  Registrarse
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
              El registro fue correcto,usted sera redirigido.
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
}
