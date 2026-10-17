import { useState } from "react";
import "./App.css";

function App() {
  const [motoSeleccionada, setMotoSeleccionada] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

const motos = [
  // ================= SPORT =================

  {
    id: 1,
    nombre: "Yamaha R3",
    precio: "$6,900",
    cilindrada: "321 cc",
    tipo: "Sport",
  },

  {
    id: 2,
    nombre: "Yamaha R7",
    precio: "$9,500",
    cilindrada: "689 cc",
    tipo: "Sport",
  },

  {
    id: 3,
    nombre: "Yamaha R1",
    precio: "$18,500",
    cilindrada: "998 cc",
    tipo: "Sport",
  },


  // ================= NAKED =================

  {
    id: 4,
    nombre: "Yamaha MT-03",
    precio: "$6,500",
    cilindrada: "321 cc",
    tipo: "Naked",
  },

  {
    id: 5,
    nombre: "Yamaha MT-07",
    precio: "$8,200",
    cilindrada: "689 cc",
    tipo: "Naked",
  },

  {
    id: 6,
    nombre: "Yamaha MT-09",
    precio: "$10,500",
    cilindrada: "890 cc",
    tipo: "Naked",
  },


  // ================= STREET =================

  {
    id: 7,
   nombre: "Yamaha Crux",
    precio: "$1,387",
    cilindrada: "110 cc",
    tipo: "Street",
  },

  {
    id: 8,
    nombre: "Yamaha FZ-S",
    precio: "$4,500",
    cilindrada: "149 cc",
    tipo: "Street",
  }, 

  {
    id: 9,
    nombre: "Yamaha FZ 25",
    precio: "$4,800",
    cilindrada: "249 cc",
    tipo: "Street",
  },


  // ================= DOBLE PROPOSITO =================

  {
    id: 10,
    nombre: "Yamaha XTZ 125",
    precio: "$3,900",
    cilindrada: "125 cc",
    tipo: "Doble propósito",
  },

  {
    id: 11,
    nombre: "Yamaha XTZ 150",
    precio: "$3,150",
    cilindrada: "149 cc",
    tipo: "Doble proposito",
  },

  {
    id: 12,
    nombre: "Yamaha Tenere 700",
    precio: "$12,500",
    cilindrada: "689 cc",
    tipo: "Doble propósito",
  },
]; 

  const irASeccion = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const agregarAlCarrito = (moto) => {
    setCarrito((carritoActual) => [
      ...carritoActual,
      moto,
    ]);
  };

  const eliminarDelCarrito = (indice) => {
  setCarrito((carritoActual) =>
    carritoActual.filter((_, index) => index !== indice)
  );
};

  const enviarCotizacion = (e) => {
    e.preventDefault();

    alert("Solicitud de cotización enviada correctamente.");

    e.target.reset();
    setMotoSeleccionada("");
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="logo">
          
          <div className="logo-yamaha">YAMAHA</div>
          <small>Motos de ensuenño</small>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#motos">Motos</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="navbar-buttons">

          <button
            className="btn-pagos-superior"
            onClick={() => irASeccion("pagos")}
          >
            Métodos de pago
          </button>

          <button
            className="btn-cotizar"
            onClick={() => irASeccion("cotizacion")}
          >
            Cotizar
          </button>

          <button
            className="btn-carrito"
            onClick={() => setCarritoAbierto(true)}
          >
            carrito ({carrito.length})
          </button>

        </div>

      </header>

      {/* ================= HERO ================= */}

<section className="hero" id="inicio">

  <div className="hero-content">

    <div className="hero-logo">
      <img
        src="/yamaha-logo.png"
        alt="Yamaha Motor"
      />

      <span>AGENCIA OFICIAL YAMAHA</span>
    </div>

    <h1>
      Potencia que te lleva
      <br />
      más lejos
    </h1>

    <p>
      Descubre nuestra variedad de motocicletas Yamaha,
      diseñadas para ofrecer rendimiento, seguridad y estilo.
    </p>

    <button
      className="btn-principal"
      onClick={() => irASeccion("motos")}
    >
      Ver motocicletas
    </button>

  </div>

  <div className="hero-moto">

    <div className="hero-logo-grande">

      <img
        src="/yamaha-logo.png"
        alt="Yamaha Motor"
      />

      <strong>YAMAHA</strong>

    </div>

  </div>

</section>

      {/* ================= MOTOS ================= */}

      <section className="motos" id="motos">

        <div className="titulo-seccion">

          <span>NUESTROS MODELOS</span>

          <h2>Encuentra tu Yamaha</h2>

          <p>
            Conoce algunos de nuestros modelos disponibles.
          </p>

        </div>

        <div className="moto-grid">

          {motos.map((moto) => (

            <div className="moto-card" key={moto.id}>

              <div className="moto-imagen">
                <span>YAMAHA</span>
              </div>

              <div className="moto-info">

                <h3>{moto.nombre}</h3>

                <p>
                  {moto.tipo} · {moto.cilindrada}
                </p>

                <strong>
                  {moto.precio}
                </strong>

                <button
                  onClick={() => {
                    setMotoSeleccionada(moto.nombre);
                    irASeccion("cotizacion");
                  }}
                >
                  Cotizar esta moto
                </button>

                <button
                  onClick={() => agregarAlCarrito(moto)}
                >
                  Agregar al carrito
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= SERVICIOS ================= */}

      <section className="servicios" id="servicios">

        <div className="titulo-seccion">

          <span>NUESTROS SERVICIOS</span>

          <h2>Todo para tu Yamaha</h2>

        </div>

        <div className="servicios-grid">

          <div className="servicio">

            <div className="servicio-icono">
              01
            </div>

            <h3>
              Venta de motocicletas
            </h3>

            <p>
              Encuentra diferentes modelos Yamaha
              para adaptarse a tus necesidades.
            </p>

          </div>


          <div className="servicio">

            <div className="servicio-icono">
              02
            </div>

            <h3>
              Repuestos y accesorios
            </h3>

            <p>
              Productos para mantener tu motocicleta
              en excelentes condiciones.
            </p>

          </div>


          <div className="servicio">

            <div className="servicio-icono">
              03
            </div>

            <h3>
              Servicio técnico
            </h3>

            <p>
              Atención y mantenimiento para el cuidado
              de tu motocicleta.
            </p>

          </div>

        </div>

      </section>


      {/* ================= COTIZACION ================= */}

      <section className="cotizacion" id="cotizacion">

        <div className="titulo-seccion">

          <span>AGENCIA YAMAHA</span>

          <h2>
            Solicita tu cotización
          </h2>

          <p>
            Completa el formulario y recibe información
            sobre la motocicleta que deseas.
          </p>

        </div>


        <div className="cotizacion-contenedor">


          {/* INFORMACION */}

          <div className="cotizacion-info">

            <h3>
              ¿Por qué cotizar con nosotros?
            </h3>


            <div className="beneficio">

              <div className="beneficio-icono">
                01
              </div>

              <div>

                <h4>
                  Asesoría personalizada
                </h4>

                <p>
                  Te ayudamos a elegir la motocicleta
                  que mejor se adapte a tus necesidades.
                </p>

              </div>

            </div>


            <div className="beneficio">

              <div className="beneficio-icono">
                02
              </div>

              <div>

                <h4>
                  Información clara
                </h4>

                <p>
                  Conoce precios, disponibilidad y
                  opciones de pago.
                </p>

              </div>

            </div>


            <div className="beneficio">

              <div className="beneficio-icono">
                03
              </div>

              <div>

                <h4>
                  Variedad de modelos
                </h4>

                <p>
                  Encuentra la Yamaha ideal para ti.
                </p>

              </div>

            </div>


            <div className="beneficio">

              <div className="beneficio-icono">
                04
              </div>

              <div>

                <h4>
                  Atención personalizada
                </h4>

                <p>
                  Estamos disponibles para resolver
                  tus dudas.
                </p>

              </div>

            </div>

          </div>


          {/* ================= FORMULARIO ================= */}

          <form
            className="formulario-cotizacion"
            onSubmit={enviarCotizacion}
          >

            <div className="formulario-header">

              <span>
                DATOS DEL CLIENTE
              </span>

              <h3>
                Completa tus datos
              </h3>

              <p>
                Ingresa tu información para poder contactarte.
              </p>

            </div>


            {/* NOMBRE Y TELEFONO */}

            <div className="form-grid">

              <div className="campo">

                <label>
                  Nombre completo
                </label>

                <input
                  type="text"
                  placeholder="Ej. Rosbel Pleytes"
                  required
                />

              </div>


              <div className="campo">

                <label>
                  Número de teléfono
                </label>

                <input
                  type="tel"
                  placeholder="Ej. 8888-8888"
                  required
                />

              </div>

            </div>


            {/* CORREO */}

            <div className="campo">

              <label>
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="Ej. correo@ejemplo.com"
                required
              />

            </div>

            {/* BARRIO */}

            <div className="campo">

              <label>
                Barrio
              </label>

              <input
                type="barrio"
                placeholder="Agregar barrio"
                required
              />
            </div>

            {/* DIRECCION */}

            <div className="campo">

              <label>
                Direccion 
              </label>

              <input 
                type="direcion"
                placeholder="Agregar direccion"
                required
              />

            </div>


            {/* INFORMACION DE LA MOTO */}

            <div className="formulario-header moto-header">

              <span>
                INFORMACIÓN DE LA MOTO
              </span>

              <h3>
                ¿Qué motocicleta te interesa?
              </h3>

            </div>


            {/* SELECT MOTO */}

            <div className="campo">

              <label>
                Motocicleta
              </label>

              <select
                value={motoSeleccionada}
                onChange={(e) =>
                  setMotoSeleccionada(e.target.value)
                }
                required
              >

                <option value="">
                  Selecciona una motocicleta
                </option>

                {motos.map((moto) => (

                  <option
                    key={moto.id}
                    value={moto.nombre}
                  >
                    {moto.nombre}
                  </option>

                ))}

              </select>

            </div>


            {/* MENSAJE */}

            <div className="campo">

              <label>
                Mensaje o consulta
              </label>

              <textarea
                placeholder="Escribe aquí cualquier pregunta que tengas..."
                rows="5"
              ></textarea>

            </div>


            {/* BOTON */}

            <button
              type="submit"
              className="btn-enviar"
            >
              Enviar cotización
            </button>

          </form>

        </div>

      </section>


      {/* ================= PAGOS ================= */}

      <section className="pagos" id="pagos">

        <div className="titulo-seccion">

          <span>
            FORMAS DE PAGO
          </span>

          <h2>
            Métodos de pago
          </h2>

          <p>
            Selecciona la opción que mejor se adapte
            a tus necesidades.
          </p>

        </div>


        <div className="pagos-grid">


          <div className="pago-card">

            <div className="pago-icono">
              $
            </div>

            <h3>
              Efectivo
            </h3>

            <p>
              Realiza tu pago directamente
              en nuestra agencia.
            </p>

          </div>


          <div className="pago-card">

            <div className="pago-icono">
              CARD
            </div>

            <h3>
              Tarjeta de débito
            </h3>

            <p>
              Paga utilizando tu tarjeta de débito.
            </p>

          </div>


          <div className="pago-card">

            <div className="pago-icono">
              CARD
            </div>

            <h3>
              Tarjeta de crédito
            </h3>

            <p>
              Consulta las opciones disponibles.
            </p>

          </div>


          <div className="pago-card">

            <div className="pago-icono">
              BANK
            </div>

            <h3>
              Transferencia
            </h3>

            <p>
              Realiza una transferencia bancaria.
            </p>

          </div>


          <div className="pago-card">

            <div className="pago-icono">
              %
            </div>

            <h3>
              Financiamiento
            </h3>

            <p>
              Consulta nuestras opciones
              de financiamiento.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CONTACTO ================= */}

      <section
        className="contacto"
        id="contacto"
      >

        <span>
          ¿TIENES ALGUNA DUDA?
        </span>

        <h2>
          Estamos para ayudarte
        </h2>

        <p>
          Comunícate con nosotros y recibe
          atención personalizada.
        </p>

        <button
          className="btn-principal"
          onClick={() => irASeccion("cotizacion")}
        >
          Contactar
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">
          YAMAHA
        </div>

        <p>
          © 2026 Agencia Yamaha - Todos los derechos reservados
        </p>

      </footer>

            {carritoAbierto && (
        <div className="carrito-overlay">

          <div className="carrito-panel">

            <div className="carrito-header">

              <div>
                <span>AGENCIA YAMAHA</span>
                <h2>Mi carrito</h2>
              </div>

              <button
                className="carrito-cerrar"
                onClick={() => setCarritoAbierto(false)}
              >
                ×
              </button>

            </div>


            <div className="carrito-contenido">

              {carrito.length === 0 ? (

                <div className="carrito-vacio">
                  <h3>Tu carrito está vacío</h3>
                  <p>
                    Agrega una motocicleta para comenzar.
                  </p>
                </div>

              ) : (

                carrito.map((moto, index) => (

                  <div
                    className="carrito-item"
                    key={`${moto.id}-${index}`}
                  >

                    <div>
                      <h3>{moto.nombre}</h3>

                      <p>
                        {moto.tipo} · {moto.cilindrada}
                      </p>

                      <strong>
                        {moto.precio}
                      </strong>

                      <button
                        className="btn-eliminar-carrito"
                        onClick={() => eliminarDelCarrito(index)}
                      >
                        elimiar
                      </button>
                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;