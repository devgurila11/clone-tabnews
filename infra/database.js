import { Client } from "pg"; // importando o Client do modulo pg

async function query(queryObject) {
  // funcao assincrona que recebe um objeto de query
  const client = new Client({
    // instanciando o Client
    host: process.env.POSTGRES_HOST, // variavel de ambiente - configurando o host do banco de dados
    port: process.env.POSTGRES_PORT, // variavel de ambiente - configurando a porta do banco de dados
    user: process.env.POSTGRES_USER, // variavel de ambiente - configurando o usuario do banco de dados
    database: process.env.POSTGRES_DB, // variavel de ambiente - configurando o nome do banco de dados
    password: process.env.POSTGRES_PASSWORD, // variavel de ambiente - configurando a senha do banco de dados
  });
  await client.connect(); // conectando ao banco de dados, await quando a funcao for assincrona

  try {
    const result = await client.query(queryObject); // executando a query
    return result; // retornando o resultado
  } catch (error) {
    console.error(error);
  } finally {
    await client.end(); // encerrando a conexao
  }
}

export default {
  query: query,
};
