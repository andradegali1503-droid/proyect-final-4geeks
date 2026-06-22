import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";

vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn()
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const moduloReal = await vi.importActual("react-router-dom");

  return {
    ...moduloReal,
    useNavigate: () => mockNavigate
  };
});

describe("Pantalla de login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("envia email y password al iniciar sesion", async () => {
    const iniciarSesion = vi.fn().mockResolvedValue({});
    useAuth.mockReturnValue({
      iniciarSesion
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Email"), "maria@gmail.com");
    await userEvent.type(screen.getByLabelText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(iniciarSesion).toHaveBeenCalledWith({
      email: "maria@gmail.com",
      password: "123456"
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("muestra mensaje de error si falla el login", async () => {
    const iniciarSesion = vi.fn().mockRejectedValue({
      response: {
        data: {
          message: "Credenciales invalidas"
        }
      }
    });

    useAuth.mockReturnValue({
      iniciarSesion
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Email"), "maria@gmail.com");
    await userEvent.type(screen.getByLabelText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Credenciales invalidas")).toBeInTheDocument();
  });
});
