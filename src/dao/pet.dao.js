import PetModel from '../models/pet.model.js';

export default class PetDAO {
  getAll() {
    return PetModel.find().lean();
  }

  insertMany(pets) {
    return PetModel.insertMany(pets);
  }
}
