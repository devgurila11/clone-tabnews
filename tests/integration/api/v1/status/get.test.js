test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // verificar o corpo da resposta da resposta http acima

  const responseBody = await response.json();

  // verificar se updated_at é uma data válida em formato ISO 8601
  // tenta converter a string em um objeto Date e depois volta para ISO string
  // se a string não for uma data válida, o resultado será "Invalid Date"

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
