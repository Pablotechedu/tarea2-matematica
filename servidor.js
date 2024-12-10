// Importar el módulo mysql2
const mysql = require("mysql2");

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "userapp",
  password: "pabs_24", // Reemplazar con tu contraseña configurada
  database: "BancoDB",
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos BancoDB");

  // Ejecutar todas las consultas requeridas
  realizarConsultas();
});

// Función principal para ejecutar todas las consultas
async function realizarConsultas() {
  try {
    // 3.1 Listado de todas las cuentas creadas
    console.log("\n=== Listado de todas las cuentas creadas ===");
    const [cuentas] = await connection.promise().query("SELECT * FROM cuentas");
    console.table(cuentas);

    // 3.2 Listado de todos los clientes creados
    console.log("\n=== Listado de todos los clientes creados ===");
    const [clientes] = await connection
      .promise()
      .query("SELECT * FROM clientes");
    console.table(clientes);

    // 3.3 Listado de todas las cuentas asociadas a clientes
    console.log("\n=== Listado de cuentas asociadas a clientes ===");
    const [cuentasClientes] = await connection.promise().query(
      `SELECT c.id_cuenta, c.tipo_cuenta, c.saldo, 
                    cl.id_cliente, cl.nombre, cl.ciudad
             FROM cuentas c
             INNER JOIN clientes cl ON c.id_cliente = cl.id_cliente`
    );
    console.table(cuentasClientes);

    // 3.4 Listado de clientes sin cuentas asociadas
    console.log("\n=== Listado de clientes sin cuentas asociadas ===");
    const [clientesSinCuenta] = await connection.promise().query(
      `SELECT cl.id_cliente, cl.nombre, cl.ciudad
             FROM clientes cl
             LEFT JOIN cuentas c ON cl.id_cliente = c.id_cliente
             WHERE c.id_cuenta IS NULL`
    );
    console.table(clientesSinCuenta);
  } catch (error) {
    console.error("Error al ejecutar las consultas:", error);
  } finally {
    // Cerrar la conexión
    connection.end();
  }
}
