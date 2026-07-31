# 🍽️ MesaClick

MesaClick es una aplicación web **Full Stack** para digitalizar la gestión de reservas de un restaurante. La plataforma permite que los clientes consulten el menú, reserven una mesa, revisen el clima previsto para la terraza y administren sus reservas desde un mismo lugar.

El restaurante dispone además de un panel privado desde el que puede supervisar las reservas y gestionar el contenido de la aplicación.

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Modelo de datos](#-modelo-de-datos)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [API REST](#-api-rest)
- [Reglas de negocio](#-reglas-de-negocio)
- [Pruebas](#-pruebas)
- [Mejoras futuras](#-mejoras-futuras)

## 🎯 Descripción

Muchos restaurantes pequeños y medianos todavía gestionan sus reservas mediante llamadas, mensajes o anotaciones manuales. Esto puede provocar reservas duplicadas, pérdida de información y dificultades para controlar la disponibilidad.

MesaClick centraliza este proceso mediante una solución que integra:

- Registro e inicio de sesión de usuarios.
- Reservas online con control de disponibilidad.
- Consulta y administración de reservas.
- Gestión del menú del restaurante.
- Opiniones y valoraciones de clientes.
- Previsión meteorológica para reservas en terraza.
- Envío de confirmaciones por correo electrónico.
- Panel de administración protegido por roles.

## ✨ Funcionalidades

### 👤 Clientes

- Crear una cuenta e iniciar sesión.
- Mantener la sesión mediante un token JWT.
- Consultar el menú público por categorías.
- Crear reservas indicando fecha, hora, número de personas y zona.
- Elegir entre mesa interior (`indoor`) o terraza (`terrace`).
- Consultar la previsión meteorológica al reservar en terraza.
- Recibir una confirmación mediante EmailJS cuando el servicio está configurado.
- Consultar y cancelar sus propias reservas.
- Leer y publicar reseñas con una valoración de 1 a 5.

### 🛡️ Administradores

- Consultar todas las reservas.
- Editar la fecha, hora, zona, número de personas y estado de una reserva.
- Confirmar, cancelar o eliminar reservas.
- Crear, editar y eliminar platos del menú.
- Marcar platos como disponibles o no disponibles.
- Eliminar reseñas.

## 🧰 Tecnologías

### Frontend

- ⚛️ React 18
- ⚡ Vite
- 🧭 React Router
- 🌐 Axios
- 🎨 Bootstrap y React Bootstrap
- 🔐 Context API para la autenticación
- ✉️ EmailJS
- 🌦️ Open-Meteo API
- 🧪 Vitest y Testing Library

### Backend

- 🟢 Node.js
- 🚂 Express
- 🍃 MongoDB y Mongoose
- 🔑 JSON Web Tokens
- 🔒 bcryptjs
- ✅ express-validator
- 🔄 CORS
- 🧪 Jest y Supertest

## 🏗️ Arquitectura

El repositorio está dividido en dos aplicaciones independientes:

```text
proyect-final-4geeks/
├── backend/
│   ├── src/
│   │   ├── config/         # Conexión con MongoDB
│   │   ├── controllers/    # Lógica de la API
│   │   ├── data/           # Datos iniciales
│   │   ├── middlewares/    # Autenticación, roles y validaciones
│   │   ├── models/         # Modelos de Mongoose
│   │   ├── routes/         # Rutas REST
│   │   ├── seeds/          # Carga de datos de ejemplo
│   │   ├── utils/          # Token y reglas de reservas
│   │   └── validators/     # Validaciones de entrada
│   ├── tests/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── context/        # Estado global de autenticación
│   │   ├── pages/          # Pantallas de la aplicación
│   │   ├── routes/         # Rutas públicas y privadas
│   │   ├── services/       # API, clima y correo
│   │   └── tests/
│   └── vite.config.mjs
└── README.md
```

El frontend consume la API REST del backend. El backend aplica las reglas de negocio, protege las operaciones privadas y persiste la información en MongoDB.

## 🗃️ Modelo de datos

La aplicación utiliza cuatro entidades principales:

| Entidad | Información principal |
| --- | --- |
| `User` | Nombre, correo, contraseña cifrada y rol |
| `Reservation` | Usuario, fecha, hora, personas, zona y estado |
| `MenuItem` | Nombre, descripción, precio, categoría, imagen y disponibilidad |
| `Review` | Usuario, puntuación, comentario y fecha de creación |

## 🚀 Instalación

### Requisitos previos

- Node.js
- npm
- MongoDB local o una instancia de MongoDB Atlas
- Cuenta de EmailJS si se desea habilitar el envío de correos

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyect-final-4geeks
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Copia `backend/.env.example` como `backend/.env` y completa sus valores.

```bash
npm run dev
```

La API se iniciará por defecto en `http://localhost:5000`.

### 3. Configurar el frontend

En otra terminal:

```bash
cd frontend
npm install
```

Copia `frontend/.env.example` como `frontend/.env` y configura las variables necesarias.

```bash
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.

### 4. Cargar datos iniciales (opcional)

```bash
cd backend
npm run seed:menu
npm run seed:reviews
```

## ⚙️ Variables de entorno

### Backend: `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mesaclick
JWT_SECRET=escribe_un_secreto_largo_y_seguro
CLIENT_URL=http://localhost:5173
```

### Frontend: `frontend/.env`

```env
VITE_API_URL=http://localhost:5000

VITE_EMAILJS_PUBLIC_KEY=tu_clave_publica
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id

VITE_RESTAURANT_LAT=37.3891
VITE_RESTAURANT_LON=-5.9845
VITE_RESTAURANT_TIMEZONE=auto
```

> [!IMPORTANT]
> No publiques el archivo `.env` ni credenciales privadas en el repositorio. Las variables `VITE_*` se incorporan al código del navegador y, por tanto, no deben contener secretos.

## 📜 Scripts disponibles

### Backend

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia la API con recarga automática |
| `npm start` | Inicia la API con Node.js |
| `npm test` | Ejecuta las pruebas del backend |
| `npm run seed:menu` | Carga el menú inicial |
| `npm run seed:reviews` | Carga reseñas de ejemplo |

### Frontend

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la compilación |
| `npm test` | Ejecuta las pruebas del frontend |

## 🔌 API REST

La URL base local es:

```text
http://localhost:5000/api
```

Las rutas protegidas esperan el token en la cabecera:

```http
Authorization: Bearer <token>
```

### Autenticación

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Público | Registrar un usuario |
| `POST` | `/auth/login` | Público | Iniciar sesión |
| `GET` | `/auth/me` | Usuario | Consultar el perfil |

### Reservas

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `POST` | `/reservations` | Usuario | Crear una reserva |
| `GET` | `/reservations/mine` | Usuario | Consultar reservas propias |
| `PATCH` | `/reservations/mine/:id/cancel` | Usuario | Cancelar una reserva propia |
| `GET` | `/reservations` | Admin | Consultar todas las reservas |
| `PATCH` | `/reservations/:id/status` | Admin | Cambiar el estado |
| `PATCH` | `/reservations/:id` | Admin | Editar una reserva |
| `DELETE` | `/reservations/:id` | Admin | Eliminar una reserva |

### Menú

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `GET` | `/menu` | Público | Consultar el menú |
| `POST` | `/menu` | Admin | Crear un plato |
| `PUT` | `/menu/:id` | Admin | Editar un plato |
| `DELETE` | `/menu/:id` | Admin | Eliminar un plato |

### Reseñas

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `GET` | `/reviews` | Público | Consultar las reseñas |
| `POST` | `/reviews` | Usuario | Publicar una reseña |
| `DELETE` | `/reviews/:id` | Admin | Eliminar una reseña |

### Estado del servicio

```http
GET /api/health
```

## 📏 Reglas de negocio

- No se pueden crear reservas para fechas pasadas.
- Cada reserva admite entre 1 y 12 personas.
- Un usuario no puede mantener dos reservas activas para la misma fecha y hora.
- Las reservas canceladas dejan de ocupar disponibilidad.
- La capacidad por fecha, hora y zona es:
  - Interior: **10 reservas activas**.
  - Terraza: **6 reservas activas**.
- Los estados disponibles son `pending`, `confirmed` y `cancelled`.
- La previsión de Open-Meteo está disponible únicamente dentro del rango admitido por su API.

## 🧪 Pruebas

El proyecto contiene pruebas automatizadas para:

- Registro, inicio de sesión y recuperación del perfil.
- Validación de tokens y rutas privadas.
- Creación, actualización y eliminación de reservas.
- Fechas pasadas, duplicados y límites de disponibilidad.
- Cliente HTTP y servicios del frontend.
- Formularios de inicio de sesión y reservas.
- Respuestas generales y errores de la API.

Para ejecutarlas:

```bash
cd backend
npm test
```

```bash
cd frontend
npm test
```

## 🔮 Mejoras futuras

- Incorporar una distribución real de mesas y aforos por número de comensales.
- Enviar los correos desde el backend.
- Añadir recuperación de contraseña.
- Incorporar filtros y métricas en el panel administrativo.
- Implementar paginación para reservas y reseñas.
- Añadir pruebas end-to-end.

## 👨‍💻 Proyecto académico

MesaClick ha sido desarrollado como proyecto Full Stack para aplicar conceptos de React, Node.js, Express, MongoDB, autenticación, APIs externas, validaciones y testing en una solución basada en una necesidad real.

---

Desarrollado con ❤️ para ofrecer una experiencia de reserva sencilla, organizada y moderna.
