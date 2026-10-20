import mongoose from 'mongoose';
import config from './config.js';

export const connectDB = async () => {
  if (!config.mongoUrl) {
    throw new Error('Falta la variable MONGO_URL en el archivo .env');
  }
  await mongoose.connect(config.mongoUrl);
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
};
