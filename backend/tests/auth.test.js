jest.mock("../src/models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const User = require("../src/models/User");

const crearToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

describe("Pruebas de autenticacion", () => {
  test("register crea usuario y devuelve token", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: "usuario_1",
      name: "Maria",
      email: "maria@gmail.com",
      role: "user"
    });

    const respuesta = await request(app).post("/api/auth/register").send({
      name: "Maria",
      email: "maria@gmail.com",
      password: "123456",
      role: "user"
    });

    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body.name).toBe("Maria");
    expect(respuesta.body.email).toBe("maria@gmail.com");
    expect(respuesta.body.role).toBe("user");
    expect(typeof respuesta.body.token).toBe("string");
  });

  test("register rechaza usuario repetido", async () => {
    User.findOne.mockResolvedValue({
      _id: "usuario_1",
      email: "maria@gmail.com"
    });

    const respuesta = await request(app).post("/api/auth/register").send({
      name: "Maria",
      email: "maria@gmail.com",
      password: "123456"
    });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body).toEqual({
      message: "El usuario ya existe"
    });
  });

  test("login devuelve token cuando las credenciales son correctas", async () => {
    User.findOne.mockResolvedValue({
      _id: "usuario_1",
      name: "Maria",
      email: "maria@gmail.com",
      role: "user",
      compararPassword: jest.fn().mockResolvedValue(true)
    });

    const respuesta = await request(app).post("/api/auth/login").send({
      email: "maria@gmail.com",
      password: "123456"
    });

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body.email).toBe("maria@gmail.com");
    expect(typeof respuesta.body.token).toBe("string");
  });

  test("login rechaza credenciales invalidas", async () => {
    User.findOne.mockResolvedValue({
      _id: "usuario_1",
      compararPassword: jest.fn().mockResolvedValue(false)
    });

    const respuesta = await request(app).post("/api/auth/login").send({
      email: "maria@gmail.com",
      password: "mala"
    });

    expect(respuesta.statusCode).toBe(401);
    expect(respuesta.body).toEqual({
      message: "Credenciales invalidas"
    });
  });

  test("GET /api/auth/me falla si no hay token", async () => {
    const respuesta = await request(app).get("/api/auth/me");

    expect(respuesta.statusCode).toBe(401);
    expect(respuesta.body).toEqual({
      message: "No autorizado, falta el token"
    });
  });

  test("GET /api/auth/me detecta hash bcrypt en vez de JWT", async () => {
    const respuesta = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer $2a$10$YzJBGaGY.3ixBupWWxMb2euFb3XTsldluGV4MKt/H5H5vapJsEXaS");

    expect(respuesta.statusCode).toBe(401);
    expect(respuesta.body).toEqual({
      message: "Token invalido",
      detalle: "Estas enviando un hash de bcrypt. Debes usar el token JWT que devuelve login o register."
    });
  });

  test("GET /api/auth/me devuelve el perfil con token valido", async () => {
    const token = crearToken("usuario_1");

    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: "usuario_1",
        name: "Maria",
        email: "maria@gmail.com",
        role: "user"
      })
    });

    const respuesta = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body).toEqual({
      _id: "usuario_1",
      name: "Maria",
      email: "maria@gmail.com",
      role: "user"
    });
  });
});
