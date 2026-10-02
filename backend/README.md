# Backend para practicar frontend

Express + Sequelize + MySQL. Basado en tu proyecto, sin frontend.

## Preparación en Windows
1. Descomprimí en una carpeta nueva.
2. Activá MySQL en XAMPP y creá una base vacía llamada practica_front en phpMyAdmin.
3. Copiá .env.example como .env. Configurá los datos de MySQL y reemplazá JWT_SECRET por una clave larga propia.
4. Abrí una terminal en backend-practica, ejecutá npm install y después npm run dev.
5. Esperá el mensaje de conexión y servidor en el puerto 3000.

Se crean las tablas que faltan sin borrar registros al reiniciar. No hay usuarios precargados. Registrá uno para probar.

## Contrato para construir tu frontend
Base: http://localhost:3000/api
Frontend permitido: http://localhost:5173. Si Vite usa otro puerto, ajustá FRONTEND_URL y reiniciá el backend.

| Método | Ruta | Datos que enviás | Resultado correcto |
| --- | --- | --- | --- |
| POST | /register | name, lastname, username, email, password | 201 y message; no inicia sesión |
| POST | /login | username, password | 200 y message; guarda cookie token |
| GET | /profile | Sin cuerpo | 200 y user con id, name, lastname |
| POST | /logout | Sin cuerpo | 200 y message; elimina cookie |
| GET | /tasks | Sin cuerpo | Array de tus tareas |
| GET | /tasks-by-user | Sin cuerpo | Igual que /tasks |
| POST | /tasks | title, description, is_completed opcional | 201 y tarea creada |
| PUT | /tasks/:id | Campos a modificar | 200 y tarea actualizada |
| DELETE | /tasks/:id | Sin cuerpo | 200 y message |

Usá JSON para los cuerpos, Content-Type application/json y credentials include en fetch para manejar la cookie entre puertos.
La cookie es HttpOnly: React no lee el token. Consultá /profile para conocer la sesión.
Las tareas requieren sesión y cada usuario solo puede ver, modificar y eliminar las propias.

Campos de registro: obligatorios; textos hasta 100 caracteres; email válido; contraseña de al menos 6 caracteres y hasta 72 bytes UTF-8. Usuario y email únicos.
Tarea: title obligatorio hasta 100 caracteres, description texto hasta 100 caracteres, is_completed booleano (por defecto false).
Errores: 400 datos inválidos, 401 credenciales inválidas o falta de sesión, 404 tarea inexistente, 409 usuario/email duplicado, 500 error interno. El mensaje está en message.

## Tu práctica, de a un paso
1. Formulario de registro y sus estados.
2. Envío del registro y presentación de errores.
3. Formulario de login y envío de credenciales.
4. Consulta del perfil para mostrar el usuario.
5. Cierre de sesión.
6. Lista y creación de tareas.

Mnemotecnia: capturo, envío, reviso, muestro.

## Verificación
Se verificó la sintaxis JavaScript. La conexión real y los recorridos con MySQL deben probarse en tu computadora con XAMPP.
