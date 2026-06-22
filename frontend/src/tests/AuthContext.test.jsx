import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import { obtenerPerfil } from "../services/authService";
import PrivateRoute from "../routes/PrivateRoute";

vi.mock("../services/authService", () => ({
  loginUsuario: vi.fn(),
  registrarUsuario: vi.fn(),
  obtenerPerfil: vi.fn()
}));

function TextoPrivado() {
  return <p>Zona privada</p>;
}

describe("AuthContext y rutas privadas", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("muestra el contenido privado cuando hay token valido", async () => {
    localStorage.setItem("token", "token_valido");
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        _id: "1",
        name: "Maria",
        email: "maria@gmail.com",
        role: "user"
      })
    );

    obtenerPerfil.mockResolvedValue({
      _id: "1",
      name: "Maria",
      email: "maria@gmail.com",
      role: "user"
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <PrivateRoute>
            <TextoPrivado />
          </PrivateRoute>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Zona privada")).toBeInTheDocument();
    });
  });

  test("limpia la sesion si el token ya no sirve", async () => {
    localStorage.setItem("token", "token_invalido");
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        _id: "1",
        name: "Maria",
        email: "maria@gmail.com",
        role: "user"
      })
    );

    obtenerPerfil.mockRejectedValue(new Error("token invalido"));

    render(
      <MemoryRouter>
        <AuthProvider>
          <PrivateRoute>
            <TextoPrivado />
          </PrivateRoute>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
    });
  });
});
