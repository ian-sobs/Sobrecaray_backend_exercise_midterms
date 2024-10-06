const fs = require('fs');
const path = require('path');
const timestamp = new Date().toISOString();
const filePath = path.join('data', 'users.json');
const Joi = require('joi');


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


const schema = Joi.object({
  username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
})


module.exports = {
  schema,
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
