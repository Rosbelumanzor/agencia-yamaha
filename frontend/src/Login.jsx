
import { useState } from "react";
import "./Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarInicioSesion = (e) => {
    e.preventDefault();

    if (!correo.trim() || !contrasena.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    setMensaje(
      "Formulario de demostración. El inicio de sesión aún no está conectado."
    );
  };

  return (
    <main className="login-pagina">
      <section className="login-lateral">
        <a className="login-volver" href="/">
          ← Volver a la agencia
        </a>

        <div className="login-marca">
          <span className="login-linea"></span>
          <p>AGENCIA OFICIAL</p>
          <h1>YAMAHA</h1>
          <h2>Revs Your Heart</h2>
          <p className="login-descripcion">
            Potencia, tecnología y libertad sobre dos ruedas.
          </p>
        </div>

        <p className="login-pie">
          TU PRÓXIMA AVENTURA COMIENZA AQUÍ
        </p>
      </section>

      <section className="login-contenedor">
        <div className="login-tarjeta">
          <div className="login-icono">Y</div>

          <p className="login-etiqueta">BIENVENIDO DE NUEVO</p>
          <h2>Iniciar sesión</h2>
          <p className="login-subtitulo">
            Ingresa tus datos para continuar.
          </p>

          <form onSubmit={manejarInicioSesion}>
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button type="submit" className="login-boton">
              INICIAR SESIÓN
            </button>

            {mensaje && (
              <p className="login-mensaje" role="status">
                {mensaje}
              </p>
            )}
          </form>

          <p className="login-nota">
            Página de demostración académica.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;