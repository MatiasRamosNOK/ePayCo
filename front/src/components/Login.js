import React from "react";
import Background from "../../../back/public/static/images/Login.jpg";

export default function Login() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  return (
    <div
      className="loginContainer"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="gridLogin">
        <div className="loginBox">
          <div
            style={{
              marginTop: 20,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: "25px" }}>Correo</h3>

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              style={{ fontSize: 20, border: "0px " }}
              type="email"
              placeholder="ejemplo@gmail.com"
            />

            {/* Aca va el correo*/}
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
            <h3 style={{ fontSize: "25px" }}>Contraseña</h3>

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              style={{ fontSize: 20, border: "0px " }}
              type="password"
              placeholder="**********"
            />

            {/* Aca va la contraseña*/}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <button
              style={{
                color: "white",
                borderColor: "black",
                borderRadius: 5,
                fontSize: 15,
                width: "85%",
                height: "30px",
                background:
                  " linear-gradient(90deg, rgba(0,65,255,1) 0%, rgba(58,9,121,1) 40%, rgba(121,9,120,1) 78%, rgba(2,0,36,1) 100%)",
              }}
            >
              Iniciar Sesion
            </button>
            {/* Aca va boton login*/}
          </div>
        </div>
      </div>
    </div>
  );
}
