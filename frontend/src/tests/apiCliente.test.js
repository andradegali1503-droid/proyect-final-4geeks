import { beforeEach, describe, expect, test, vi } from "vitest";

const usarPeticion = vi.fn();
const usarRespuesta = vi.fn();
const crearInstancia = vi.fn(() => ({
  interceptors: {
    request: {
      use: usarPeticion
    },
    response: {
      use: usarRespuesta
    }
  }
}));

vi.mock("axios", () => ({
  default: {
    create: crearInstancia
  }
}));

describe("Cliente HTTP", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.unstubAllEnvs();
    localStorage.clear();
  });

  test("usa la url del deploy y agrega /api", async () => {
    vi.stubEnv("VITE_API_URL", "https://proyect-final-4geeks.onrender.com");

    await import("../services/api");

    expect(crearInstancia).toHaveBeenCalledWith({
      baseURL: "https://proyect-final-4geeks.onrender.com/api"
    });
  });

  test("agrega el token guardado en las peticiones", async () => {
    vi.stubEnv("VITE_API_URL", "https://proyect-final-4geeks.onrender.com");
    localStorage.setItem("token", "token_prueba");

    await import("../services/api");

    const callbackPeticion = usarPeticion.mock.calls[0][0];
    const config = callbackPeticion({ headers: {} });

    expect(config.headers.Authorization).toBe("Bearer token_prueba");
  });
});
