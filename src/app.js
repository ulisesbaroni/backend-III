import express from 'express';
import config from './config/config.js';
import { connectDB } from './config/db.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API de mocking funcionando' });
});

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

try {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
  });
} catch (error) {
  console.error('No se pudo iniciar el servidor:', error.message);
  process.exit(1);
}
