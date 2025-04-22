const { Categoria, sequelize } = require("./associations");
const Producto = require("./models/producto");
const Usuario = require("./models/usuario");
const Cliente = require("./models/cliente");
const Cita = require("./models/cita");
const StockMovimiento = require("./models/stock_movimiento");

async function insertarDatosEjemplo() {
  // CATEGORÍAS
  const categorias = [
    { nombre: "Monturas" },
    { nombre: "Lentes de contacto" },
    { nombre: "Líquidos y accesorios" }
  ];
  if (await Categoria.count() === 0) {
    await Categoria.bulkCreate(categorias);
    console.log("Categorías insertadas.");
  }

  // PRODUCTOS
  const productos = [
    {
      nombre: "Montura Ray-Ban RX3447V",
      descripcion: "Montura metálica clásica redonda",
      precio: 119.99,
      stock: 15,
      categoria_id: 1
    },
    {
      nombre: "Lentes Acuvue Oasys",
      descripcion: "Lentes de contacto quincenales con hidratación",
      precio: 34.50,
      stock: 40,
      categoria_id: 2
    },
    {
      nombre: "Líquido ReNu Advanced 360ml",
      descripcion: "Solución multiuso para lentes de contacto",
      precio: 8.95,
      stock: 50,
      categoria_id: 3
    }
  ];
  if (await Producto.count() === 0) {
    await Producto.bulkCreate(productos);
    console.log("Productos insertados.");
  }

  // USUARIOS
  const usuarios = [
    { nombre: "Admin", email: "admin@optica.com", contraseña: "admin123", rol: "admin" },
    { nombre: "Trabajador 1", email: "empleado@optica.com", contraseña: "trab123", rol: "trabajador" }
  ];
  if (await Usuario.count() === 0) {
    await Usuario.bulkCreate(usuarios);
    console.log("Usuarios insertados.");
  }

  // CLIENTES
  const clientes = [
    { nombre: "Carlos Pérez", email: "carlos@example.com", teléfono: "600123123" },
    { nombre: "Laura Gómez", email: "laura@example.com", teléfono: "611234567" },
    { nombre: "Mario Ruiz", email: "mario@example.com", teléfono: "622345678" }
  ];
  if (await Cliente.count() === 0) {
    await Cliente.bulkCreate(clientes);
    console.log("Clientes insertados.");
  }

  // CITAS
  const citas = [
    {
      cliente_id: 1,
      usuario_id: 2,
      fecha_hora: new Date(),
      motivo: "Revisión visual",
      estado: "pendiente"
    },
    {
      cliente_id: 2,
      usuario_id: 2,
      fecha_hora: new Date(),
      motivo: "Compra de lentes",
      estado: "pendiente"
    }
  ];
  if (await Cita.count() === 0) {
    await Cita.bulkCreate(citas);
    console.log("Citas insertadas.");
  }

  // STOCK MOVIMIENTOS
  const movimientos = [
    {
      producto_id: 1,
      usuario_id: 2,
      tipo: "entrada",
      cantidad: 10,
      nota: "Reposición inicial"
    },
    {
      producto_id: 2,
      usuario_id: 2,
      tipo: "salida",
      cantidad: 2,
      nota: "Venta directa"
    }
  ];
  if (await StockMovimiento.count() === 0) {
    await StockMovimiento.bulkCreate(movimientos);
    console.log("Movimientos de stock insertados.");
  }
}

module.exports = insertarDatosEjemplo;
