import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Reserve from "../pages/Reserve";
import { crearReserva } from "../services/reservationService";
import { enviarEmailConfirmacion } from "../services/emailService";
import { obtenerClimaReserva } from "../services/weatherService";
import { useAuth } from "../context/AuthContext";

vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn()
}));

vi.mock("../services/reservationService", () => ({
  crearReserva: vi.fn()
}));

vi.mock("../services/emailService", () => ({
  enviarEmailConfirmacion: vi.fn(),
  obtenerVariablesEmailjsFaltantes: () => []
}));

vi.mock("../services/weatherService", () => ({
  etiquetaClima: "Andalucia, Espana (referencia Sevilla)",
  obtenerClimaReserva: vi.fn()
}));

describe("Pantalla de reserva", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      usuario: {
        name: "Maria",
        email: "maria@gmail.com"
      }
    });
  });

  test("envia el formulario de reserva al backend", async () => {
    crearReserva.mockResolvedValue({});
    obtenerClimaReserva.mockResolvedValue({
      fecha: "2030-01-01",
      descripcion: "Cielo despejado",
      temperaturaMinima: 18,
      temperaturaMaxima: 27,
      probabilidadLluvia: 0
    });
    enviarEmailConfirmacion.mockResolvedValue({});

    render(<Reserve />);

    await userEvent.type(screen.getByLabelText("Fecha"), "2030-01-01");
    await userEvent.type(screen.getByLabelText("Hora"), "20:00");
    await userEvent.clear(screen.getByLabelText("Personas"));
    await userEvent.type(screen.getByLabelText("Personas"), "4");
    await userEvent.selectOptions(screen.getByLabelText("Area"), "terrace");
    await userEvent.click(screen.getByRole("button", { name: "Crear reserva" }));

    expect(crearReserva).toHaveBeenCalledWith({
      date: "2030-01-01",
      time: "20:00",
      people: "4",
      area: "terrace"
    });
    expect(obtenerClimaReserva).toHaveBeenCalledWith("2030-01-01");
    expect(enviarEmailConfirmacion).toHaveBeenCalled();
    expect(await screen.findByText("Reserva creada correctamente")).toBeInTheDocument();
  });
});
