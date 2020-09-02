import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  realizarPago,
  limpiarPago,
  comprobarToken,
} from "../redux/actions/user";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const statusPago = useSelector(
    (store) => store.userReducer.user.pagoRealizado
  );
  const statusToken = useSelector(
    (store) => store.userReducer.user.tokenCorrecto
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [idCompra, setIDCompra] = React.useState(null);
  const [documento, setDocumento] = React.useState(null);
  const [celular, setCelular] = React.useState(null);
  const [codigoVerificacion, setCodigoVerificacion] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openExito, setOpenExito] = React.useState(false);
  const [exito, setExito] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [redirect, setRedirect] = React.useState(null);
  const [waiting, setWaiting] = React.useState(false);
  const steps = getSteps();

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

    setOpenExito(false);
  };

  function getSteps() {
    return ["Ingresar datos", "Escriba el ID", "Felicitaciones"];
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>ID Pago</h2>
            <input
              type="text"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                fontSize: 20,
              }}
              value={idCompra}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setIDCompra(0);
                } else {
                  setIDCompra(e.target.value);
                }
              }}
            />
            <h2>Documento</h2>
            <input
              type="number"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                fontSize: 20,
              }}
              value={documento}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setDocumento(0);
                } else {
                  setDocumento(e.target.value);
                }
              }}
            ></input>
            <h2>Celular</h2>
            <input
              type="number"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                fontSize: 20,
              }}
              value={celular}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setCelular(0);
                } else {
                  setCelular(e.target.value);
                }
              }}
            ></input>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Escriba el ID enviado a su correo</h2>
            <input
              type="number"
              value={codigoVerificacion}
              style={{
                border: "none",
                borderBottom: "1px solid black",
                fontSize: 20,
              }}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setCodigoVerificacion(0);
                } else {
                  setCodigoVerificacion(e.target.value);
                }
              }}
            ></input>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>El pago se ha realizado correctamente</h3>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const isButtonDisable = () => {
    if (activeStep == 0) {
      return documento != null && idCompra != null && celular != null;
    } else if (activeStep == 1) {
      return codigoVerificacion != null;
    } else if (activeStep == 2) {
      return true;
    }
  };

  const handleNext = () => {
    setWaiting(true);
    if (activeStep == 0) {
      console.log("Entro en step 0");
      dispatch(realizarPago(idCompra, documento, celular));
    }
    if (activeStep == 1) {
      console.log("Entro en step 1");
      dispatch(comprobarToken(documento, codigoVerificacion));
    }
    if (activeStep == 2) {
      setRedirect(true);
    }
  };

  const avanzar = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep == 0) {
      if (statusPago !== "Correcto" && statusPago !== null) {
        console.log("Entro en el primer if");
        setWaiting(false);
        setError(statusPago);
        setOpen(true);
        dispatch(limpiarPago());
      } else if (statusPago == "Correcto") {
        console.log("Entro en el primer else");
        setWaiting(false);
        setOpenExito(true);
        setExito("Datos correctos");
        avanzar();
      }
    } else if (activeStep == 1) {
      if (statusToken) {
        setWaiting(false);
        console.log("Entro en el segundo if");
        setOpenExito(true);
        setExito("Pago realizado correctamente");
        avanzar();
      }
    }
  }, [statusPago, statusToken]);

  return (
    <div className={classes.root}>
      {redirect ? <Redirect to={"/"} /> : null}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {isButtonDisable() ? (
                    <>
                      {waiting ? (
                        <CircularProgress
                          style={{
                            width: 30,
                            height: 30,
                            marginTop: 40,
                            marginLeft: 25,
                            color: "green",
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                          disabled={false}
                        >
                          {activeStep == 0 ? "Validar" : null}
                          {activeStep == 1 ? "Comprobar" : null}
                          {activeStep == 2 ? "Finalizar" : null}
                        </Button>
                      )}
                    </>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openExito}
        autoHideDuration={2500}
        onClose={handleCloseExito}
      >
        <Alert onClose={handleCloseExito} severity="success">
          {exito}
        </Alert>
      </Snackbar>
    </div>
  );
}
