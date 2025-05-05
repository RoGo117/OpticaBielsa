const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

const productoRoutes = require("./routes/productoRoutes");
app.use("/productos", productoRoutes);

const usuariosRoutes = require("./routes/usuariosRoutes");
app.use("/usuarios", usuariosRoutes);

const stockMovimientoRoutes = require("./routes/stockMovimientoRoutes");
app.use("/stock", stockMovimientoRoutes);

const clientesRoutes = require("./routes/clientesRoutes");
app.use("/clientes", clientesRoutes);

const citasRoutes = require("./routes/citasRoutes");
app.use("/citas", citasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});