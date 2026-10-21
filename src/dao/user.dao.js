import UserModel from '../models/user.model.js';

export default class UserDAO {
  getAll() {
    return UserModel.find().lean();
  }

  insertMany(users) {
    return UserModel.insertMany(users);
  }
}
