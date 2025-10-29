markdown
# 🗳️ VistaNacional – Trazabilidad Electoral Institucional

## 🌐 Despliegue

🔗 [https://gestorelectoral.netlify.app](https://gestorelectoral.netlify.app)

---

## 🚀 Instalación rápida

### Backend

```bash
cd server
npm install
touch .env
.env:

env
PORT=3001
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=clave_secreta_segura
bash
npm run dev
Frontend
bash
cd client
npm install
npm run dev
Abrí http://localhost:5173 en tu navegador.

🔐 Roles y autenticación
Login con email y contraseña

Token JWT en contexto

Roles: ciudadano, admin, fiscal

Acceso condicional por rol

📦 APIs consumidas
Resultados
Método	Ruta	Descripción
GET	/api/resultados	Listar todas las mesas
POST	/api/resultados	Crear nueva mesa
PUT	/api/resultados/:id	Editar mesa existente
DELETE	/api/resultados/:id	Eliminar mesa
Fiscales
Método	Ruta	Descripción
GET	/api/usuarios/fiscales	Listar fiscales
POST	/api/usuarios/fiscales	Crear nuevo fiscal
DELETE	/api/usuarios/fiscales/:id	Eliminar fiscal
🧪 Funcionalidades principales
✅ Registro de resultados por mesa testigo

✅ Validación de votos vs electores

✅ Visualización por partido

✅ Edición y eliminación

✅ Panel de fiscales

✅ Modo oscuro y accesibilidad

✨ Autora
Elizabeth Fontao

Código

Este fragmento está optimizado para que lo pegues en tu `README.md` y se vea bien en GitHub. Si querés que lo combine con el resto del contenido completo, lo armamos en un solo bloque. ¿Querés que lo integre todo en un README final?
ahora mejor veamos una nueva versión completa tambien con los link de repo de back y de frond y que soy alumna de la diplamtura poner info de la diplo y lafecha
Perfecto, Ely. Acá tenés una versión completa y profesional de tu README.md, lista para entregar y publicar en GitHub. Incluye:

✅ Descripción institucional del proyecto

✅ Despliegue en Netlify

✅ Repositorios de frontend y backend

✅ Tecnologías utilizadas

✅ Instalación paso a paso

✅ APIs consumidas

✅ Funcionalidades

✅ Autenticación y roles

✅ Licencia

✅ Tu autoría como alumna de la Diplomatura

✅ Fecha de entrega

markdown
# 🗳️ VistaNacional – Trazabilidad Electoral Institucional

## 📌 Descripción

**VistaNacional** es una aplicación fullstack desarrollada con **React + Express + MongoDB** que permite registrar, visualizar y auditar resultados provisorios de mesas testigo en procesos electorales.  
Está diseñada para uso institucional, pedagógico y técnico, con foco en trazabilidad territorial, accesibilidad y buenas prácticas cívicas.

---

## 🌐 Despliegue

🔗 Aplicación en producción: [https://gestorelectoral.netlify.app](https://gestorelectoral.netlify.app)

---

## 📦 Repositorios

- 🔗 Frontend: [https://github.com/elyfontao/vistanacional-front](https://github.com/elyfontao/vistanacional-front)  
- 🔗 Backend: [https://github.com/elyfontao/vistanacional-back](https://github.com/elyfontao/vistanacional-back)

---

## 🧠 Objetivos del proyecto

- Modelar interfaces democráticas con trazabilidad territorial  
- Enseñar buenas prácticas de carga, validación y visualización de datos  
- Integrar componentes reutilizables, accesibles y documentados  
- Simular flujos institucionales de carga, edición, auditoría y visualización

---

## 🧩 Tecnologías utilizadas

### 🖥️ Frontend

- React  
- Tailwind CSS  
- React Router DOM  
- Axios  
- Chart.js  
- Heroicons  
- Netlify (despliegue)

### ⚙️ Backend

- Express.js  
- MongoDB Atlas  
- Mongoose  
- dotenv  
- cors  
- bcryptjs  
- JSON Web Token  
- nodemon  
- Render (despliegue)

---

## 🗂️ Estructura del proyecto

vista-nacional/ ├── client/ # Frontend React │ ├── src/ │ │ ├── pages/ # Vistas principales │ │ ├── components/ # Componentes reutilizables │ │ ├── context/ # Contexto global │ │ ├── api/ # Axios configurado │ │ ├── auth/ # Hook de autenticación │ │ └── assets/ # Recursos visuales ├── server/ # Backend Express │ ├── models/ # Esquemas Mongoose │ ├── routes/ # Rutas API │ ├── controllers/ # Lógica de negocio │ ├── middleware/ # Autenticación y validación │ └── index.js # Entrada del servidor

Código

---

## 🚀 Instalación y ejecución

### 🔧 Backend

```bash
cd server
npm install
touch .env
.env:

env
PORT=3001
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=clave_secreta_segura
bash
npm run dev
🖥️ Frontend
bash
cd client
npm install
npm run dev
Abrí http://localhost:5173 en tu navegador.

🔐 Autenticación y roles
Login con email y contraseña

Token JWT almacenado en contexto

Roles definidos: admin, delegado, veedor, fiscal

Acceso condicional a rutas y botones según rol

📦 APIs consumidas
Resultados
Método	Ruta	Descripción
GET	/api/resultados	Listar todas las mesas
POST	/api/resultados	Crear nueva mesa
PUT	/api/resultados/:id	Editar mesa existente
DELETE	/api/resultados/:id	Eliminar mesa
Usuarios fiscales
Método	Ruta	Descripción
GET	/api/usuarios/fiscales	Listar fiscales
POST	/api/usuarios/fiscales	Crear nuevo fiscal
DELETE	/api/usuarios/fiscales/:id	Eliminar fiscal
🧪 Funcionalidades principales
✅ Registro de resultados por mesa testigo

✅ Validación de votos vs electores

✅ Visualización por partido (gráfico de barras)

✅ Edición y eliminación de resultados

✅ Panel de administración de fiscales

✅ Acceso diferenciado por rol

✅ Modo oscuro y diseño accesible

🎓 Diplomatura
Este proyecto fue desarrollado como parte de la Diplomatura en Programación Web Fullstack con React y Node.js, dictada por la Universidad Nacional de Catamarca en articulación con la Universidad Tecnológica Nacional y el Ministerio de Ciencia, Tecnología e Innovación de la Nación. Fecha de entrega: Octubre 2025

📄 Licencia
Este proyecto es de uso educativo e institucional. Puede ser adaptado para simulaciones, capacitaciones o proyectos cívicos. Se agradece la atribución si se reutiliza.

✨ Autora
Elizabeth Fontao Alumna de la Diplomatura en Programación Web Fullstack San Fernando del Valle de Catamarca, Argentina

Código

¿Querés que preparemos una versión con capturas de pantalla o una portada visual para GitHub?



