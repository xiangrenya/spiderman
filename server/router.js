const express = require('express');
const router = express.Router();
const MovieController = require('./modules/movie.controller')

router.get('/movies', MovieController.list);
router.post('/movies', MovieController.save);

module.exports = router;