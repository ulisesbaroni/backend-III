import PetDAO from '../dao/pet.dao.js';

class PetRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getPets() {
    return this.dao.getAll();
  }

  createPets(pets) {
    return this.dao.insertMany(pets);
  }
}

export const petRepository = new PetRepository(new PetDAO());
