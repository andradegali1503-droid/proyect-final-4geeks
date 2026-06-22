jest.mock("../src/models/User", () => ({
  findById: jest.fn()
}));

jest.mock("../src/models/Reservation", () => ({
  findOne: jest.fn(),
  countDocuments: jest.fn(),
  create: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const User = require("../src/models/User");
const Reservation = require("../src/models/Reservation");

const crearToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const ponerUsuarioAutenticado = () => {
  User.findById.mockReturnValue({
    select: jest.fn().mockResolvedValue({
      _id: "usuario_1",
      name: "Maria",
      email: "maria@gmail.com",
      role: "user"
    })
  });
};

describe("Pruebas de reservas", () => {
  test("no permite crear reservas en fecha pasada", async () => {
    ponerUsuarioAutenticado();
    const token = crearToken("usuario_1");

    const respuesta = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2020-01-01",
        time: "20:00",
        people: 2,
        area: "terrace"
      });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body).toEqual({
      message: "La fecha de la reserva no puede ser pasada"
    });
  });

  test("no permite crear una reserva duplicada del mismo usuario", async () => {
    ponerUsuarioAutenticado();
    const token = crearToken("usuario_1");
    Reservation.findOne.mockResolvedValue({
      _id: "reserva_1"
    });

    const respuesta = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2030-01-01",
        time: "20:00",
        people: 2,
        area: "terrace"
      });

    expect(respuesta.statusCode).toBe(409);
    expect(respuesta.body).toEqual({
      message: "Ya tienes una reserva activa para esa fecha y hora"
    });
  });

  test("no permite crear reserva si no hay cupo", async () => {
    ponerUsuarioAutenticado();
    const token = crearToken("usuario_1");
    Reservation.findOne.mockResolvedValue(null);
    Reservation.countDocuments.mockResolvedValue(6);

    const respuesta = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2030-01-01",
        time: "20:00",
        people: 2,
        area: "terrace"
      });

    expect(respuesta.statusCode).toBe(409);
    expect(respuesta.body).toEqual({
      message: "Ya no hay cupo en terrace para esa fecha y hora"
    });
  });

  test("crea reserva cuando los datos son validos", async () => {
    ponerUsuarioAutenticado();
    const token = crearToken("usuario_1");
    Reservation.findOne.mockResolvedValue(null);
    Reservation.countDocuments.mockResolvedValue(2);
    Reservation.create.mockResolvedValue({
      populate: jest.fn().mockResolvedValue({
        _id: "reserva_1",
        user: {
          _id: "usuario_1",
          name: "Maria",
          email: "maria@gmail.com"
        },
        date: "2030-01-01T00:00:00.000Z",
        time: "20:00",
        people: 2,
        area: "terrace",
        status: "pending"
      })
    });

    const respuesta = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2030-01-01",
        time: "20:00",
        people: 2,
        area: "terrace"
      });

    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body.time).toBe("20:00");
    expect(respuesta.body.area).toBe("terrace");
    expect(respuesta.body.status).toBe("pending");
  });
});
