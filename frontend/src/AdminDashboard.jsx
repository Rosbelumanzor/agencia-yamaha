import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const motosIniciales = [
  { id: 1, nombre: "Yamaha R3", tipo: "Sport", precio: 6900, stock: 4, estado: "Disponible" },
  { id: 2, nombre: "Yamaha R7", tipo: "Sport", precio: 9500, stock: 2, estado: "Disponible" },
  { id: 3, nombre: "Yamaha MT-07", tipo: "Naked", precio: 8200, stock: 0, estado: "Agotada" },
  { id: 4, nombre: "Yamaha XTZ 150", tipo: "Doble propósito", precio: 3150, stock: 3, estado: "Disponible" },
];

const cotizacionesDemo = [
  { id: "COT-001", cliente: "Cliente de demostración", moto: "Yamaha R3", fecha: "2026-10-18", estado: "Pendiente" },
  { id: "COT-002", cliente: "Cliente de demostración", moto: "Yamaha MT-07", fecha: "2026-10-19", estado: "En revisión" },
  { id: "COT-003", cliente: "Cliente de demostración", moto: "Yamaha XTZ 150", fecha: "2026-10-20", estado: "Atendida" },
];

const secciones = [
  { id: "resumen", label: "Resumen", icon: "▦" },
  { id: "motos", label: "Inventario de motos", icon: "◈" },
  { id: "cotizaciones", label: "Cotizaciones", icon: "▤" },
  { id: "usuarios", label: "Usuarios", icon: "♙" },
];

const moneda = (valor) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(valor);

export default function AdminDashboard() {
  const [seccion, setSeccion] = useState("resumen");
  const [busqueda, setBusqueda] = useState("");
  const [motos, setMotos] = useState(motosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [motoEditando, setMotoEditando] = useState(null);
  const [formMoto, setFormMoto] = useState({ nombre: "", tipo: "Sport", precio: "", stock: "" });
  const [aviso, setAviso] = useState("");
  const navigate = useNavigate();

  const motosFiltradas = useMemo(() => motos.filter((moto) =>
    `${moto.nombre} ${moto.tipo} ${moto.estado}`.toLowerCase().includes(busqueda.toLowerCase())
  ), [motos, busqueda]);

  const abrirNuevaMoto = () => {
    setMotoEditando(null);
    setFormMoto({ nombre: "", tipo: "Sport", precio: "", stock: "" });
    setModalAbierto(true);
  };

  const abrirEditarMoto = (moto) => {
    setMotoEditando(moto.id);
    setFormMoto({ nombre: moto.nombre, tipo: moto.tipo, precio: String(moto.precio), stock: String(moto.stock) });
    setModalAbierto(true);
  };

  const guardarMoto = (e) => {
    e.preventDefault();
    const precio = Number(formMoto.precio);
    const stock = Number(formMoto.stock);

    if (!formMoto.nombre.trim() || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(stock) || stock < 0) {
      setAviso("Revisa el nombre, el precio y el inventario.");
      return;
    }

    if (motoEditando !== null) {
      setMotos((actuales) => actuales.map((moto) => moto.id === motoEditando
        ? { ...moto, ...formMoto, precio, stock, estado: stock > 0 ? "Disponible" : "Agotada" }
        : moto
      ));
      setAviso("Moto actualizada en los datos de demostración.");
    } else {
      setMotos((actuales) => [...actuales, {
        id: Math.max(0, ...actuales.map((moto) => moto.id)) + 1,
        ...formMoto,
        precio,
        stock,
        estado: stock > 0 ? "Disponible" : "Agotada",
      }]);
      setAviso("Moto agregada a los datos de demostración.");
    }

    setModalAbierto(false);
  };

  const eliminarMoto = (id) => {
    const moto = motos.find((item) => item.id === id);
    if (!moto || !window.confirm(`¿Eliminar ${moto.nombre} de los datos de demostración?`)) return;
    setMotos((actuales) => actuales.filter((item) => item.id !== id));
    setAviso("Moto eliminada de los datos de demostración.");
  };

  const cambiarEstadoCotizacion = (id) => {
    setAviso(`La gestión de ${id} es una demostración; todavía no se guarda en el servidor.`);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-sidebar-brand" to="/">
          <span className="admin-sidebar-mark">Y</span>
          <span><strong>YAMAHA</strong><small>ADMINISTRACIÓN</small></span>
        </Link>

        <p className="admin-sidebar-caption">MENÚ PRINCIPAL</p>
        <nav className="admin-sidebar-nav" aria-label="Menú de administración">
          {secciones.map((item) => (
            <button
              key={item.id}
              className={seccion === item.id ? "active" : ""}
              onClick={() => { setSeccion(item.id); setAviso(""); }}
            >
              <span className="admin-nav-icon">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user-mini">
            <div className="admin-avatar">A</div>
            <div><strong>Administrador</strong><small>Modo demostración</small></div>
          </div>
          <button className="admin-sidebar-exit" onClick={() => navigate("/admin/login")}>Cerrar panel</button>
          <Link className="admin-store-link" to="/">← Volver a la tienda</Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-eyebrow">AGENCIA OFICIAL YAMAHA</p>
            <h1>{secciones.find((item) => item.id === seccion)?.label}</h1>
          </div>
          <div className="admin-topbar-status"><span /> Interfaz local</div>
        </header>

        <div className="admin-content">
          {aviso && <div className="admin-notice" role="status">{aviso}<button onClick={() => setAviso("")} aria-label="Cerrar aviso">×</button></div>}

          {seccion === "resumen" && (
            <>
              <div className="admin-welcome">
                <div><span>RESUMEN GENERAL</span><h2>Panel de control</h2><p>Vista general de la actividad de la agencia.</p></div>
                <button className="admin-button-primary" onClick={() => { setSeccion("motos"); abrirNuevaMoto(); }}>+ Agregar motocicleta</button>
              </div>
              <div className="admin-stats-grid">
                <article className="admin-stat-card"><span className="admin-stat-icon">◈</span><p>Modelos en inventario</p><strong>{motos.length}</strong><small>Datos de demostración</small></article>
                <article className="admin-stat-card"><span className="admin-stat-icon">✓</span><p>Unidades disponibles</p><strong>{motos.reduce((total, moto) => total + moto.stock, 0)}</strong><small>Existencias simuladas</small></article>
                <article className="admin-stat-card"><span className="admin-stat-icon">▤</span><p>Cotizaciones de ejemplo</p><strong>{cotizacionesDemo.length}</strong><small>No conectadas a la base de datos</small></article>
                <article className="admin-stat-card"><span className="admin-stat-icon">!</span><p>Modelos agotados</p><strong>{motos.filter((moto) => moto.stock === 0).length}</strong><small>Según datos locales</small></article>
              </div>
              <section className="admin-panel-card">
                <div className="admin-card-heading"><div><h3>Inventario reciente</h3><p>Ejemplo local de motocicletas</p></div><button className="admin-button-secondary" onClick={() => setSeccion("motos")}>Ver inventario →</button></div>
                <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Motocicleta</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th></tr></thead><tbody>
                  {motos.slice(0, 4).map((moto) => <tr key={moto.id}><td><strong>{moto.nombre}</strong></td><td>{moto.tipo}</td><td>{moneda(moto.precio)}</td><td>{moto.stock}</td><td><span className={`admin-status ${moto.stock > 0 ? "available" : "empty"}`}>{moto.estado}</span></td></tr>)}
                </tbody></table></div>
              </section>
            </>
          )}

          {seccion === "motos" && (
            <section className="admin-panel-card">
              <div className="admin-card-heading"><div><h3>Inventario de motocicletas</h3><p>Los cambios se mantienen únicamente en esta sesión de demostración.</p></div><button className="admin-button-primary" onClick={abrirNuevaMoto}>+ Nueva moto</button></div>
              <div className="admin-toolbar"><label className="admin-search"><span>⌕</span><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre, categoría o estado..." /></label><span className="admin-results-count">{motosFiltradas.length} modelos</span></div>
              <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Motocicleta</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
                {motosFiltradas.map((moto) => <tr key={moto.id}><td><strong>{moto.nombre}</strong></td><td>{moto.tipo}</td><td>{moneda(moto.precio)}</td><td>{moto.stock}</td><td><span className={`admin-status ${moto.stock > 0 ? "available" : "empty"}`}>{moto.estado}</span></td><td><div className="admin-row-actions"><button onClick={() => abrirEditarMoto(moto)}>Editar</button><button className="danger" onClick={() => eliminarMoto(moto.id)}>Eliminar</button></div></td></tr>)}
                {motosFiltradas.length === 0 && <tr><td colSpan="6" className="admin-empty-cell">No hay modelos que coincidan con la búsqueda.</td></tr>}
              </tbody></table></div>
            </section>
          )}

          {seccion === "cotizaciones" && (
            <section className="admin-panel-card">
              <div className="admin-card-heading"><div><h3>Solicitudes de cotización</h3><p>Registros ilustrativos para diseñar la pantalla.</p></div><span className="admin-demo-pill">DEMO</span></div>
              <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Código</th><th>Cliente</th><th>Motocicleta</th><th>Fecha</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
                {cotizacionesDemo.map((cot) => <tr key={cot.id}><td><strong>{cot.id}</strong></td><td>{cot.cliente}</td><td>{cot.moto}</td><td>{cot.fecha}</td><td><span className={`admin-status ${cot.estado === "Atendida" ? "available" : "pending"}`}>{cot.estado}</span></td><td><button className="admin-text-button" onClick={() => cambiarEstadoCotizacion(cot.id)}>Ver solicitud</button></td></tr>)}
              </tbody></table></div>
            </section>
          )}

          {seccion === "usuarios" && (
            <section className="admin-panel-card">
              <div className="admin-card-heading"><div><h3>Usuarios del sistema</h3><p>Sección preparada para conectarse a la base de datos.</p></div><span className="admin-demo-pill">PENDIENTE</span></div>
              <div className="admin-placeholder"><div>♙</div><h4>Gestión de usuarios</h4><p>Aquí se mostrarán las cuentas, sus roles y su estado cuando se conecte el backend.</p><button className="admin-button-secondary" onClick={() => setAviso("La gestión de usuarios estará disponible cuando se conecte la API.")}>Ver estado de integración</button></div>
            </section>
          )}
        </div>
      </main>

      {modalAbierto && (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalAbierto(false); }}>
          <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
            <div className="admin-modal-heading"><div><span>INVENTARIO</span><h2 id="admin-modal-title">{motoEditando !== null ? "Editar motocicleta" : "Agregar motocicleta"}</h2></div><button onClick={() => setModalAbierto(false)} aria-label="Cerrar">×</button></div>
            <form onSubmit={guardarMoto}>
              <label>Nombre del modelo<input value={formMoto.nombre} onChange={(e) => setFormMoto({ ...formMoto, nombre: e.target.value })} placeholder="Ej. Yamaha R3" required /></label>
              <label>Categoría<select value={formMoto.tipo} onChange={(e) => setFormMoto({ ...formMoto, tipo: e.target.value })}><option>Sport</option><option>Naked</option><option>Street</option><option>Doble propósito</option></select></label>
              <div className="admin-modal-grid">
                <label>Precio (USD)<input type="number" min="1" step="1" value={formMoto.precio} onChange={(e) => setFormMoto({ ...formMoto, precio: e.target.value })} placeholder="6900" required /></label>
                <label>Unidades disponibles<input type="number" min="0" step="1" value={formMoto.stock} onChange={(e) => setFormMoto({ ...formMoto, stock: e.target.value })} placeholder="4" required /></label>
              </div>
              <p className="admin-modal-note">Estos datos son temporales y no se guardan en PostgreSQL.</p>
              <div className="admin-modal-actions"><button type="button" className="admin-button-secondary" onClick={() => setModalAbierto(false)}>Cancelar</button><button type="submit" className="admin-button-primary">Guardar cambios</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
