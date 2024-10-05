const users = [];

module.exports = {
  findUserByEmail: (email) => users.find(user => user.email === email),
  addUser: (user) => users.push(user),
  findUserById: (id) => users.find(user => user.id === id),
  getUsers: () => users
};
