const express = require('express');
const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const USERS_PATH = path.join(__dirname, 'user.json');

// Asegura que exista user.json y tenga la estructura esperada
async function ensureUserFile() {
  try {
    await fs.access(USERS_PATH);
    // si existe, no hace nada
  } catch (err) {
    if (err.code === 'ENOENT') {
      const init = { total_users: [] };
      await fs.writeFile(USERS_PATH, JSON.stringify(init, null, 2), 'utf8');
      console.log('user.json creado con estructura inicial.');
    } else {
      console.error('Error accediendo a user.json:', err);
      throw err;
    }
  }
}

// Helper para leer y parsear users de forma segura
async function readUsersFile() {
  try {
    const raw = await fs.readFile(USERS_PATH, 'utf8');
    const parsed = raw ? JSON.parse(raw) : { total_users: [] };
    if (!Array.isArray(parsed.total_users)) parsed.total_users = [];
    // normalizar: si un usuario tiene 'password' pasar a 'contraseña' para compatibilidad
    parsed.total_users = parsed.total_users.map(u => ({
      ...u,
      contraseña: u.contraseña ?? u.password ?? u.contrasena ?? u.pass ?? ''
    }));
    return parsed;
  } catch (err) {
    console.error('Error leyendo/parsing user.json:', err);
    throw err;
  }
}

// Helper para escribir users
async function writeUsersFile(parsed) {
  try {
    await fs.writeFile(USERS_PATH, JSON.stringify(parsed, null, 2), 'utf8');
  } catch (err) {
    console.error('Error escribiendo user.json:', err);
    throw err;
  }
}

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const parsed = await readUsersFile();
    res.json(parsed.total_users);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer o parsear el archivo de usuarios' });
  }
});

// POST /api/users (registro)
app.post('/api/users', async (req, res) => {
  const nuevoUsuario = req.body || {};

  // Validación estricta
  if (!nuevoUsuario.email || typeof nuevoUsuario.email !== 'string' || nuevoUsuario.email.trim() === '') {
    return res.status(400).json({ error: 'Email es obligatorio' });
  }
  if (!nuevoUsuario.nombre || typeof nuevoUsuario.nombre !== 'string' || nuevoUsuario.nombre.trim() === '') {
    return res.status(400).json({ error: 'Nombre es obligatorio' });
  }
  // aceptar 'contraseña' o 'password'
  const contraseñaCampo = nuevoUsuario.contraseña ?? nuevoUsuario.password;
  if (!contraseñaCampo || typeof contraseñaCampo !== 'string' || contraseñaCampo.trim() === '') {
    return res.status(400).json({ error: 'Contraseña es obligatoria' });
  }

  const emailIngresado = nuevoUsuario.email.trim().toLowerCase();

  try {
    const parsed = await readUsersFile();

    const existe = parsed.total_users.some(u =>
      typeof u.email === 'string' && u.email.trim().toLowerCase() === emailIngresado
    );

    if (existe) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    const userToSave = {
      ...nuevoUsuario,
      email: nuevoUsuario.email.trim(),
      nombre: nuevoUsuario.nombre.trim(),
      contraseña: contraseñaCampo.trim(),
      user_id: Date.now()
    };

    parsed.total_users.push(userToSave);
    await writeUsersFile(parsed);

    res.status(201).json(userToSave);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar usuario' });
  }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, contraseña, password } = req.body || {};

  if (!email || typeof email !== 'string' || email.trim() === '' ||
      (!contraseña && !password) || (typeof (contraseña ?? password) !== 'string') || (contraseña ?? password).trim() === ''
  ) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const emailIngresado = email.trim().toLowerCase();
  const contraseñaIngresada = (contraseña ?? password).trim();

  console.log('Login recibido:', emailIngresado, contraseñaIngresada); // 👁️ Verifica qué llega del frontend

  try {
    const parsed = await readUsersFile();

    console.log('Usuarios disponibles:', parsed.total_users); // 👁️ Verifica qué hay en user.json

    const usuario = parsed.total_users.find(u =>
      typeof u.email === 'string' &&
      typeof u.contraseña === 'string' &&
      u.email.trim().toLowerCase() === emailIngresado &&
      u.contraseña.trim() === contraseñaIngresada
    );

    if (!usuario) {
      console.log('❌ Usuario no encontrado o credenciales incorrectas');
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    console.log('✅ Usuario autenticado:', usuario.email);
    res.status(200).json(usuario);
  } catch (err) {
    console.error('Error al comprobar credenciales:', err);
    res.status(500).json({ error: 'Error al comprobar credenciales' });
  }
});

// Inicializa archivo y arranca servidor
ensureUserFile()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo iniciar el servidor por error en user.json:', err);
    process.exit(1);
  });
