import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const SPECIES = ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'fish', 'turtle'];
const ROLES = ['user', 'admin'];
const DEFAULT_PASSWORD = 'coder123';

const generatePet = () => ({
  name: faker.animal.petName(),
  specie: faker.helpers.arrayElement(SPECIES),
  birthDate: faker.date.past({ years: 15 }),
  adopted: false,
  owner: null,
  image: faker.image.url()
});

export const generatePets = (qty) => Array.from({ length: qty }, generatePet);

const generateUser = (hashedPassword) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    _id: new mongoose.Types.ObjectId(),
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(ROLES),
    pets: [],
    __v: 0
  };
};

// Hashear con bcrypt es lento a propósito: se hashea una vez por pedido y se reutiliza en todos los usuarios
export const generateUsers = async (qty) => {
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  return Array.from({ length: qty }, () => generateUser(hashedPassword));
};
