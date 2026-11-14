import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const manejarAcceso = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!correo.trim() || !contrasena.trim()) {
      setMensaje("Completa el correo y la contraseña.");
      return;
    }

    // DEMOSTRACIÓN VISUAL: todavía no valida credenciales reales.
    // La autenticación se conectará al backend cuando esté lista la base de datos.
    setMensaje("La pantalla está lista, pero el acceso aún no está conectado al servidor.");
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-brand">
        <Link className="admin-back-link" to="/">← Volver a la agencia</Link>
        <div className="admin-brand-copy">
          <span className="admin-red-line" />
          <p className="admin-overline">AGENCIA OFICIAL</p>
          <h1>YAMAHA</h1>
          <h2>Administración</h2>
          <p>Control y gestión de la agencia desde un solo lugar.</p>
        </div>
        <small>ACCESO RESTRINGIDO AL PERSONAL AUTORIZADO</small>
      </section>

      <section className="admin-login-area">
        <div className="admin-login-card">
          <div className="admin-login-symbol">Y</div>
          <p className="admin-overline red">PANEL DE CONTROL</p>
          <h2>Acceso administrador</h2>
          <p className="admin-login-subtitle">Ingresa tus credenciales administrativas.</p>

          <form onSubmit={manejarAcceso}>
            <label htmlFor="admin-correo">Correo administrativo</label>
            <input
              id="admin-correo"
              type="email"
              placeholder="admin@agenciayamaha.com"
              autoComplete="username"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label htmlFor="admin-contrasena">Contraseña</label>
            <input
              id="admin-contrasena"
              type="password"
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />

            <button className="admin-primary-button" type="submit">ENTRAR AL PANEL</button>
            {mensaje && <p className="admin-login-message" role="status">{mensaje}</p>}
          </form>

          <p className="admin-demo-note">
            Interfaz de demostración. El inicio de sesión real requiere validación del servidor.
          </p>
        </div>
      </section>
    </main>
  );
}
