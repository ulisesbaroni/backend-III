import express from 'express';
import config from './config/config.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API de mocking funcionando' });
});

try {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
  });
} catch (error) {
  console.error('No se pudo iniciar el servidor:', error.message);
  process.exit(1);
}
