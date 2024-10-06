const fs = require('fs');
const path = require('path');
const timestamp = new Date().toISOString();
const filePath = path.join('data', 'users.json');

let users = [];
fs.readFile(filePath, 'utf8', (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    let jsonArr = JSON.parse(contents);
    users = jsonArr;
  } catch (jsonError) {
    console.error('Error parsing JSON');
  }
});


module.exports = {
  findUserByEmail: (email) => users.find(user => user.email === email),
  //addUser: (user) => users.push(user),
  addUser: function(user){
    users.push(user)
    const jsonStringArr = JSON.stringify(users)
    fs.writeFile(filePath, jsonStringArr, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`[${timestamp}] New user added to database`);
      }
    });
  },
  findUserById: (id) => users.find(user => user.id === id),
  getUsers: () => users
};
