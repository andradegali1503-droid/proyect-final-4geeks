# ⚜️ L'Atelier Noir — Luxury Restaurant Reservation Suite (5 Estrellas)

Aplicación digital de reservas y gestión de sala concebida para un restaurante de **cinco estrellas / tres estrellas Michelin**, diseñada bajo la premisa de transmitir **exclusividad, elegancia, hospitalidad y confianza**.

El sistema funciona como una extensión digital del restaurante: refinada y serena para el comensal, ágil y de alta precisión para el equipo de sala y cocina.

---

## 📋 Tabla de Contenidos

- [Concepto & Dirección Creativa](#-concepto--dirección-creativa)
- [Fases del Master Prompt Cubiertas](#-fases-del-master-prompt-cubiertas)
- [Funcionalidades de Alta Hospitalidad](#-funcionalidades-de-alta-hospitalidad)
- [Consola del Maître d' & Plano de Sala](#-consola-del-maître-d--plano-de-sala)
- [Seguridad & Privacidad](#-seguridad--privacidad)
- [Puesta en Marcha & Despliegue](#-puesta-en-marcha--despliegue)
- [Control de Calidad & Pruebas](#-control-de-calidad--pruebas)

---

## 🎨 Concepto & Dirección Creativa: «L'Atelier Noir»

- **Paleta Cromática:** Negro carbón satinado (`#0B0A0A`), grafito cálido (`#161514`), marfil suave (`#F6F5F2`) y acentos en oro pálido cepillado (`#C5A059`).
- **Tipografía:** Fusión de tipografía Serif de corte editorial (*Cormorant Garamond* / *Playfair Display*) para titulares y nombres de pases culinarios, combinada con Sans-Serif geométrica (*Inter* / *Plus Jakarta Sans*) para la lectura ágil de coordenadas de reserva.
- **Atmósfera:** Sobria, contemporánea y sin distracciones estridentes, emulando la serenidad de los grandes templos gastronómicos europeos.

---

## 🚀 Fases del Master Prompt Cubiertas

1. **Auditoría e Instalación de Skills:** Inventario verificado de capacidades, skills del entorno (`generative_ui`, `automation`, `ui-plugin-navigation`) y paquetes del ecosistema (`lucide-react`, `vitest`, `jest`).
2. **Investigación de Referencias Michelin:** Estudio de flujos de reserva premium (*SevenRooms*, *Tock Premier*, *Resy Global Dining Access*).
3. **Principios de Diseño:** Jerarquía visual espaciosa, accesibilidad WCAG AA/AAA, contrastes refinados y microinteracciones fluidas.
4. **Experiencia del Cliente:** Selección de menús degustación, selector de sala o terraza acristalada con clima en vivo (Open-Meteo), protocolo estricto de alergias alimentarias, políticas de puntualidad y cancelación, y confirmación con **Pase de Huésped Digital** y código único.
5. **Consola del Restaurante (Maître d'):** Vista por turnos de servicio (*Déjeuner* 13:00-16:30 y *Dîner* 20:00-23:30), **Plano de Sala Interactivo (Floorplan)** con mesas numeradas y estados en tiempo real, métricas en vivo, libro de reservas y edición directa.
6. **Arquitectura y Modularidad:** Frontend React 18 con Vite, componentes desacoplados, estilos CSS modulares en `styles.css` y backend Express.js con persistencia atómica anti-overbooking.
7. **Seguridad y Privacidad:** Roles `admin` y `user`, contraseñas encriptadas con bcrypt, tokens JWT y protección de datos sensibles.
8. **Control de Calidad:** 10/10 pruebas pasadas en frontend (`vitest`), 17/17 pruebas pasadas en backend (`jest`) y build de producción optimizado en 4.29s.
9. **Preparación para Producción:** Configuración limpia de variables de entorno y scripts de despliegue.

---

## ✨ Funcionalidades de Alta Hospitalidad

### 👤 Huéspedes / Comensales
- **Selección de Experiencia Gastronómica:** *Grand Menu Dégustation*, *L'Expérience Chef's Table* o *Menu Terroir Contemporain*.
- **Previsión Meteorológica Bioclimática:** Conexión con Open-Meteo para anticipar las condiciones de las mesas en *L'Orangerie* (Terraza).
- **Filtro Estricto de Alérgenos:** Indicación clara de celiaquía, frutos secos, crustáceos, lactosa, embarazo o preferencias vegetarianas/veganas.
- **Pase de Huésped Digital:** Generación de un comprobante con código único de reserva (ej. `ATELIER-XXXXXX`), detalles del servicio y opción de impresión.
- **Gestión Personal:** Consulta del estado de la reserva y cancelación flexible sin penalización hasta 24 horas antes del servicio.

### 👔 Maître d' & Equipo de Sala
- **Plano de Sala Interactivo (Room Floorplan):**
  - **Chef's Table Privée:** Mesa C1 (frente al pase de cocina).
  - **Le Grand Salon:** Mesas M1 a M6 con iluminación íntima.
  - **L'Orangerie:** Mesas T1 a T3 con vistas exteriores.
  - Indicadores de estado visual: *Disponible* (verde tenue), *Asignada* (dorado ámbar) y *Ocupada / Sentada* (azul).
- **Turnos de Alta Cocina:** Filtro ágil entre *Déjeuner*, *Dîner* o *Día Completo*.
- **Métricas de Servicio:** Comensales totales previstos, reservas confirmadas, mesas por verificar y cancelaciones.
- **Check-in Rápido:** Confirmación o cambio de estado de comensales en un solo clic.

---

## 🛠️ Puesta en Marcha & Despliegue

### Requisitos Previos
- Node.js v18 o superior.
- MongoDB (local o MongoDB Atlas) para la persistencia del backend.

### 1. Iniciar el Backend
```bash
cd backend
npm install
npm run dev
# El servidor se iniciará en http://localhost:5000
```

### 2. Iniciar el Frontend
```bash
cd frontend
npm install
npm run dev
# La aplicación web estará disponible en http://localhost:5173
```

### 3. Compilación para Producción
```bash
cd frontend
npm run build
# Los archivos optimizados se generarán en frontend/dist/
```

---

## 🧪 Control de Calidad & Pruebas

Tanto la suite del frontend como la del backend han sido verificadas íntegramente:

```bash
# Pruebas del Backend (Jest)
cd backend
npm test
# 17 passed, 17 total

# Pruebas del Frontend (Vitest)
cd frontend
npm test
# 10 passed, 10 total
```

---

## 📜 Licencia & Estándares
Desarrollado conforme a los principios de diseño de alta hospitalidad, accesibilidad WCAG y privacidad de datos.
