const request = require("supertest");
const app = require("../src/app");

describe("Pruebas generales de la API", () => {
  test("GET /api/health responde correctamente", async () => {
    const respuesta = await request(app).get("/api/health");

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body).toEqual({
      message: "MesaClick API funcionando correctamente"
    });
  });

  test("devuelve error claro cuando el body no es JSON valido", async () => {
    const respuesta = await request(app)
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send('{"name":');

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.message).toBe("El body no es un JSON valido. Usa raw JSON en Postman.");
  });

  test("devuelve 404 en rutas inexistentes", async () => {
    const respuesta = await request(app).get("/api/no-existe");

    expect(respuesta.statusCode).toBe(404);
    expect(respuesta.body).toEqual({
      message: "Ruta no encontrada"
    });
  });
});
