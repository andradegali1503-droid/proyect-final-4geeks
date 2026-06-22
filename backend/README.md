# MesaClick Backend

Backend inicial en JavaScript para la app de reservas del restaurante MesaClick.

## Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- express-validator

## Estructura

```text
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    app.js
  .env.example
  server.js
```

## Endpoints base

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/reservations`
- `GET /api/reservations/mine`
- `PATCH /api/reservations/mine/:id/cancel`
- `GET /api/reservations`
- `PATCH /api/reservations/:id/status`
- `GET /api/menu`
- `POST /api/menu`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`
- `GET /api/reviews`
- `POST /api/reviews`
- `DELETE /api/reviews/:id`

## Arranque

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Cargar menu inicial

Puedes cargar un menu inspirado en restaurantes de Andalucia con desayunos, almuerzos, postres y bebidas:

```bash
cd backend
npm run seed:menu
```

## Siguiente paso recomendado

Ya incluye validaciones base y una regla simple de disponibilidad por franja/area.

Las capacidades asumidas por ahora son:

- `indoor`: 10 reservas activas por fecha y hora
- `terrace`: 6 reservas activas por fecha y hora

Si quieres, el siguiente paso puede ser integrar servicios reales de email/clima o añadir reglas más detalladas de mesas.
