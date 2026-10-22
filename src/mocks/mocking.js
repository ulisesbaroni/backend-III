import { faker } from '@faker-js/faker';

const SPECIES = ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'fish', 'turtle'];

const generatePet = () => ({
  name: faker.animal.petName(),
  specie: faker.helpers.arrayElement(SPECIES),
  birthDate: faker.date.past({ years: 15 }),
  adopted: false,
  owner: null,
  image: faker.image.url()
});

export const generatePets = (qty) => Array.from({ length: qty }, generatePet);
