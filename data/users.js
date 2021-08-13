const bcrypt = require('bcryptjs');
const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123457', 10),
    isAdmin: true,
  },
  {
    name: 'sonu',
    email: 'admin1@gmail.com',
    password: bcrypt.hashSync('123458', 10),
  },
  {
    name: 'saqib',
    email: 'admin2@gmail.com',
    password: bcrypt.hashSync('123459', 10),
  },
];

module.exports = users;
