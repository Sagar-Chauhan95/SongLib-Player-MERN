const express = require('express');
const  path = require("path");
const fs = require("fs");

const musicControler = require('../controllers/musicController');

const musicRouter = express.Router();

musicRouter.get('/', musicControler.getSongs);

module.exports = musicRouter;