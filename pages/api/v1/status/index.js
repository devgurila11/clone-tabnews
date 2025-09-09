import database from "infra/database.js";

async function status(request, response) {
  // Data e hora atual em formato ISO 8601
  const updatedAt = new Date().toISOString();
  // Consulta para obter a versão do banco de dados
  const databaseVersionResult = await database.query("SHOW server_version;");
  // Extrai a versão do resultado da consulta
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  // Consulta para obter o número máximo de conexões do banco de dados
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  // Extrai o número máximo de conexões do resultado da consulta
  const databasemaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databasemaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
