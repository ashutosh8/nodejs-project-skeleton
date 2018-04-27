const pgp = require('../controllers/db').pgp;

const db = require('../controllers/db').db;

module.exports = {
  get: () => {
    console.log(pgp, db);
  },
};
