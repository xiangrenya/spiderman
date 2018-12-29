const express = require('express');

const router = express.Router();
const MovieController = require('./modules/movie/movie.controller');
const NoteController = require('./modules/note/note.controller');

router.get('/movies', MovieController.list);
router.post('/movies', MovieController.save);

router.get('/notes', NoteController.list);
router.post('/notes', NoteController.save);

module.exports = router;
