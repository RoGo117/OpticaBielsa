const bcrypt = require("bcryptjs");

const plainPassword = "Empleado2";

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error al generar el hash:", err);
    process.exit(1);
  }
  console.log("Hash generado:", hash);
  process.exit(0);
});

//Ejecutar con el comando:
// node TemporalgenerateHash.js