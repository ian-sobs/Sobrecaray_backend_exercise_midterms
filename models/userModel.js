const fs = require('fs');
const path = require('path');

const filePath = path.join('../data', 'users.json');

let users = [];
fs.readFile(filePath, 'utf8', (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const jsonString = JSON.parse(contents);
    console.log(jsonString);
  } catch (jsonError) {
    console.error('Error parsing JSON');
  }
});


module.exports = {
  findUserByEmail: (email) => users.find(user => user.email === email),
  addUser: (user) => users.push(user),
  findUserById: (id) => users.find(user => user.id === id),
  getUsers: () => users
};
