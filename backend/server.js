const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// =========================================
// CONFIGURACION DE LA CONEXION A POSTGRESQL
// Reemplaza los valores con tus credenciales
// =========================================

const pool = new Pool({
    host:     'bpvvndda5viyx9y6hrrw-postgresql.services.clever-cloud.com',
    port:     '5432',
    database: 'bpvvndda5viyx9y6hrrw',
    user:     'u3h2cj6tlaulnqoiloah',
    password: 'hoFSNvwq9wXkH099FCqJHyA2jLiSbO',
});

// =========================================
// CREAR TABLA E INSERTAR MOTOS INICIALES
// =========================================

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS motos (
                id SERIAL PRIMARY KEY,
                marca VARCHAR(100) NOT NULL,
                modelo VARCHAR(100) NOT NULL,
                anio INTEGER NOT NULL,
                precio NUMERIC(10, 2) NOT NULL,
                cilindrada INTEGER,
                color VARCHAR(50),
                stock INTEGER DEFAULT 0,
                image TEXT
            );
        `);

        const { rows } = await pool.query('SELECT COUNT(*) FROM motos');

        if (parseInt(rows[0].count) === 0) {

            await pool.query(`
                INSERT INTO motos 
                (marca, modelo, anio, precio, cilindrada, color, stock, image)
                VALUES

                ('Yamaha', 'FZ 25', 2026, 5200.00, 249, 'Negro', 5,
                'https://via.placeholder.com/300'),

                ('Yamaha', 'MT-03', 2026, 6800.00, 321, 'Azul', 3,
                'https://via.placeholder.com/300'),

                ('Yamaha', 'YZF-R3', 2026, 7200.00, 321, 'Azul', 2,
                'https://via.placeholder.com/300'),

                ('Yamaha', 'XMAX 300', 2026, 8500.00, 292, 'Gris', 2,
                'https://via.placeholder.com/300')
            `);

            console.log('Datos iniciales de motos insertados');
        }

    } catch (err) {
        console.error(
            'Error al inicializar la base de datos:',
            err.message
        );
    }
}

initDB();

// =========================================
// ENDPOINTS DE LA API
// =========================================

// GET: Obtener todas las motos
app.get('/api/motos', async (req, res) => {
    try {

        const { rows } = await pool.query(
            'SELECT * FROM motos ORDER BY id'
        );

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// =========================================
// GET: Obtener una moto por ID
// =========================================

app.get('/api/motos/:id', async (req, res) => {
    try {

        const { rows } = await pool.query(
            'SELECT * FROM motos WHERE id = $1',
            [req.params.id]
        );

        if (rows.length) {

            res.json(rows[0]);

        } else {

            res.status(404).json({
                message: 'Moto no encontrada'
            });

        }

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// =========================================
// POST: Registrar una nueva moto
// =========================================

app.post('/api/motos', async (req, res) => {
    try {

        const {
            marca,
            modelo,
            anio,
            precio,
            cilindrada,
            color,
            stock,
            image
        } = req.body;

        const { rows } = await pool.query(
            `
            INSERT INTO motos
            (marca, modelo, anio, precio, cilindrada, color, stock, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `,
            [
                marca,
                modelo,
                anio,
                precio,
                cilindrada,
                color,
                stock,
                image
            ]
        );

        res.status(201).json(rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// =========================================
// DELETE: Eliminar una moto
// =========================================

app.delete('/api/motos/:id', async (req, res) => {
    try {

        await pool.query(
            'DELETE FROM motos WHERE id = $1',
            [req.params.id]
        );

        res.json({
            message: 'Moto eliminada correctamente'
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// =========================================
// INICIAR SERVIDOR
// =========================================

app.listen(port, () => {
    console.log(
        `Servidor backend en http://localhost:${port}`
    );
});