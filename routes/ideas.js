const express = require('express');
const router = express.Router();
const IdeasControllers = require('../controllers/IdeasControllers');

router.get('/', IdeasControllers.getAllIdeas);
router.get('/:id', IdeasControllers.getIdea);
router.post('/', IdeasControllers.postIdea);
router.put('/:id',IdeasControllers.putIdea);
router.delete('/:id',IdeasControllers.deletedIdea);

module.exports = router;
