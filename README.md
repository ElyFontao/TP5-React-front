
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
```

`.env`:

```env
PORT=3001
MONGO_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=clave_secreta_segura
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🔐 Roles y autenticación

- Login con email y contraseña  
- Token JWT en contexto  
- Roles: `ciudadano`, `admin`, `fiscal`  
- Acceso condicional por rol

---

## 📦 APIs consumidas

### Resultados

| Método | Ruta                   | Descripción             |
|--------|------------------------|-------------------------|
| GET    | `/api/resultados`      | Listar todas las mesas  |
| POST   | `/api/resultados`      | Crear nueva mesa        |
| PUT    | `/api/resultados/:id`  | Editar mesa existente   |
| DELETE | `/api/resultados/:id`  | Eliminar mesa           |

### Fiscales

| Método | Ruta                          | Descripción         |
|--------|-------------------------------|---------------------|
| GET    | `/api/usuarios/fiscales`      | Listar fiscales     |
| POST   | `/api/usuarios/fiscales`      | Crear nuevo fiscal  |
| DELETE | `/api/usuarios/fiscales/:id`  | Eliminar fiscal     |

---

## 🧪 Funcionalidades principales

- ✅ Registro de resultados por mesa testigo  
- ✅ Validación de votos vs electores  
- ✅ Visualización por partido  
- ✅ Edición y eliminación  
- ✅ Panel de fiscales  
- ✅ Modo oscuro y accesibilidad

---

## ✨ Autora

**Elizabeth Fontao**



