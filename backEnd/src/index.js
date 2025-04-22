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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

const productoRoutes = require("./routes/productoRoutes");
app.use("/productos", productoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});