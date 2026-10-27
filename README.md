# Mocking BE3

Pre-entrega N°1 de Backend III. API en Express que genera usuarios y mascotas de prueba (mocks) y permite insertarlos en MongoDB Atlas.

## Tecnologías

- Node.js + Express
- MongoDB Atlas + Mongoose
- bcrypt (hash de contraseñas)
- @faker-js/faker (generación de datos)
- dotenv (variables de entorno)

## Instalación

```bash
npm install
cp .env.example .env
```

Completar el `.env` con los datos de conexión (ver abajo) y levantar el servidor:

```bash
npm start      # modo normal
npm run dev    # se reinicia solo al guardar cambios
```

## Variables de entorno

| Variable    | Descripción                                    | Ejemplo |
|-------------|------------------------------------------------|---------|
| `PORT`      | Puerto del servidor (por defecto 8080)         | `8080`  |
| `MONGO_URL` | Cadena de conexión a Atlas, con la base `mocking_be3` | `mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/mocking_be3?retryWrites=true&w=majority` |

El usuario de base de datos solo necesita el rol `readWrite` sobre `mocking_be3`. La base y las colecciones se crean solas con la primera inserción.

## Estructura

```
src/
  app.js              Servidor Express y montaje de rutas
  config/             Variables de entorno y conexión a Mongo
  models/             Schemas de Mongoose (User, Pet)
  dao/                Acceso directo a la base
  repositories/       Capa que usan las rutas
  mocks/mocking.js    Generadores de usuarios y mascotas
  routes/             users, pets y mocks
```

Las rutas trabajan solo con los repositories, y los repositories con los DAO.

## Endpoints

Todas las respuestas tienen la forma `{ status, payload }` o, si hay error, `{ status: "error", error }`.

### Mocks (`/api/mocks`)

| Método | Ruta            | Descripción |
|--------|-----------------|-------------|
| GET    | `/mockingpets`  | Genera mascotas sin guardarlas. 100 por defecto, o `?qty=N` (1 a 1000). |
| GET    | `/mockingusers` | Genera usuarios sin guardarlos. 50 por defecto, o `?qty=N` (1 a 1000). |
| POST   | `/generateData` | Genera e inserta en la base. Body JSON: `{ "users": N, "pets": M }` (0 a 1000 cada uno, al menos uno mayor a 0). |

Los usuarios generados tienen:

- `password`: la contraseña `coder123` hasheada con bcrypt.
- `role`: `user` o `admin` al azar.
- `pets`: array vacío.
- `_id` y `__v`, con el mismo formato que devuelve una consulta a Mongo.

Las mascotas se generan con `adopted: false` y `owner: null`.

### Usuarios y mascotas

| Método | Ruta         | Descripción |
|--------|--------------|-------------|
| GET    | `/api/users` | Lista los usuarios guardados en la base. |
| GET    | `/api/pets`  | Lista las mascotas guardadas en la base. |

## Ejemplos

```bash
# 50 usuarios generados (no se guardan)
curl http://localhost:8080/api/mocks/mockingusers

# 10 mascotas generadas (no se guardan)
curl "http://localhost:8080/api/mocks/mockingpets?qty=10"

# Insertar 10 usuarios y 20 mascotas en la base
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 10, "pets": 20}'

# Comprobar lo insertado
curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets
```

Respuesta de `/generateData`:

```json
{ "status": "success", "payload": { "users": 10, "pets": 20 } }
```

En PowerShell de Windows, usar `curl.exe` en lugar de `curl`, porque `curl` es un alias de `Invoke-WebRequest`.
