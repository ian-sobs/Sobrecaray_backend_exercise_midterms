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
      .required()
      .messages({
        'string.alphanum': "Username must only contain alphanumeric characters.",
        'string.min': "Username must be at least 3 characters long",
        'string.max': 'Username must be less than 30 characters'}),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]{3,30}$'))
      .required()
      .messages({'string.min': 'Password must be at least 3 characters long.',
        'string.max' : 'Password must be less than 30 characters.'
      }),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .messages({'string.email': 'Invalid email'})
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
