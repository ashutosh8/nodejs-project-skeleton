// Importing modules for file upload

// const upload = require('../controllers/upload');

// const master = require('../controllers/master');

const express = require('express');

const router = express.Router();

/* Upload file route*/

router.get('/upload', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
