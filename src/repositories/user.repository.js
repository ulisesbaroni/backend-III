import UserDAO from '../dao/user.dao.js';

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers() {
    return this.dao.getAll();
  }

  createUsers(users) {
    return this.dao.insertMany(users);
  }
}

export const userRepository = new UserRepository(new UserDAO());
