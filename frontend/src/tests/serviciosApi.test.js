import { beforeEach, describe, expect, test, vi } from "vitest";

const apiMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn()
}));

vi.mock("../services/api", () => ({
  default: apiMock
}));

import { loginUsuario, obtenerPerfil, registrarUsuario } from "../services/authService";
import {
  actualizarReservaAdmin,
  cancelarReserva,
  cambiarEstadoReserva,
  crearReserva,
  eliminarReservaAdmin,
  obtenerMisReservas,
  obtenerTodasLasReservas
} from "../services/reservationService";
import { crearPlato, editarPlato, eliminarPlato, obtenerMenu } from "../services/menuService";
import { crearReview, eliminarReview, obtenerReviews } from "../services/reviewService";

describe("Servicios del frontend", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("authService llama a las rutas correctas", async () => {
    apiMock.post.mockResolvedValueOnce({ data: { token: "token" } });
    apiMock.post.mockResolvedValueOnce({ data: { token: "token" } });
    apiMock.get.mockResolvedValueOnce({ data: { name: "Maria" } });

    await loginUsuario({ email: "maria@gmail.com", password: "123456" });
    await registrarUsuario({
      name: "Maria",
      email: "maria@gmail.com",
      password: "123456"
    });
    await obtenerPerfil();

    expect(apiMock.post).toHaveBeenNthCalledWith(1, "/auth/login", {
      email: "maria@gmail.com",
      password: "123456"
    });
    expect(apiMock.post).toHaveBeenNthCalledWith(2, "/auth/register", {
      name: "Maria",
      email: "maria@gmail.com",
      password: "123456"
    });
    expect(apiMock.get).toHaveBeenCalledWith("/auth/me");
  });

  test("reservationService llama a las rutas correctas", async () => {
    apiMock.post.mockResolvedValueOnce({ data: {} });
    apiMock.get.mockResolvedValueOnce({ data: [] });
    apiMock.patch.mockResolvedValueOnce({ data: {} });
    apiMock.get.mockResolvedValueOnce({ data: [] });
    apiMock.patch.mockResolvedValueOnce({ data: {} });
    apiMock.patch.mockResolvedValueOnce({ data: {} });
    apiMock.delete.mockResolvedValueOnce({ data: {} });

    await crearReserva({
      date: "2030-01-01",
      time: "20:00",
      people: 4,
      area: "terrace"
    });
    await obtenerMisReservas();
    await cancelarReserva("reserva_1");
    await obtenerTodasLasReservas();
    await cambiarEstadoReserva("reserva_2", "confirmed");
    await actualizarReservaAdmin("reserva_3", { people: 2 });
    await eliminarReservaAdmin("reserva_4");

    expect(apiMock.post).toHaveBeenCalledWith("/reservations", {
      date: "2030-01-01",
      time: "20:00",
      people: 4,
      area: "terrace"
    });
    expect(apiMock.get).toHaveBeenNthCalledWith(1, "/reservations/mine");
    expect(apiMock.patch).toHaveBeenNthCalledWith(1, "/reservations/mine/reserva_1/cancel");
    expect(apiMock.get).toHaveBeenNthCalledWith(2, "/reservations");
    expect(apiMock.patch).toHaveBeenNthCalledWith(2, "/reservations/reserva_2/status", {
      status: "confirmed"
    });
    expect(apiMock.patch).toHaveBeenNthCalledWith(3, "/reservations/reserva_3", {
      people: 2
    });
    expect(apiMock.delete).toHaveBeenCalledWith("/reservations/reserva_4");
  });

  test("menuService y reviewService llaman a las rutas correctas", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    apiMock.post.mockResolvedValueOnce({ data: {} });
    apiMock.put.mockResolvedValueOnce({ data: {} });
    apiMock.delete.mockResolvedValueOnce({ data: {} });
    apiMock.get.mockResolvedValueOnce({ data: [] });
    apiMock.post.mockResolvedValueOnce({ data: {} });
    apiMock.delete.mockResolvedValueOnce({ data: {} });

    await obtenerMenu();
    await crearPlato({ name: "Tortilla", price: 10 });
    await editarPlato("plato_1", { name: "Tortilla" });
    await eliminarPlato("plato_1");
    await obtenerReviews();
    await crearReview({ rating: 5, comment: "Muy bien" });
    await eliminarReview("review_1");

    expect(apiMock.get).toHaveBeenNthCalledWith(1, "/menu");
    expect(apiMock.post).toHaveBeenNthCalledWith(1, "/menu", {
      name: "Tortilla",
      price: 10
    });
    expect(apiMock.put).toHaveBeenCalledWith("/menu/plato_1", {
      name: "Tortilla"
    });
    expect(apiMock.delete).toHaveBeenNthCalledWith(1, "/menu/plato_1");
    expect(apiMock.get).toHaveBeenNthCalledWith(2, "/reviews");
    expect(apiMock.post).toHaveBeenNthCalledWith(2, "/reviews", {
      rating: 5,
      comment: "Muy bien"
    });
    expect(apiMock.delete).toHaveBeenNthCalledWith(2, "/reviews/review_1");
  });
});
