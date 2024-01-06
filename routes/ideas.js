const express = require('express');
const router = express.Router();
const IdeasControllers = require('../controllers/IdeasControllers');

/**
 * Route to get all ideas.
 * @route GET /ideas
 */
router.get('/', IdeasControllers.getAllIdeas);

/**
 * Route to get a specific idea by ID.
 * @route GET /ideas/:id
 * @param {string} req.params.id - The ID of the idea.
 */
router.get('/:id', IdeasControllers.getIdea);

/**
 * Route to create a new idea.
 * @route POST /ideas
 * @param {string} req.body.text - The text of the idea.
 * @param {string} req.body.tag - The tag of the idea.
 * @param {string} req.body.username - The username associated with the idea.
 */
router.post('/', IdeasControllers.postIdea);

/**
 * Route to update an existing idea by ID.
 * @route PUT /ideas/:id
 * @param {string} req.params.id - The ID of the idea to be updated.
 * @param {string} req.params.username - The username associated with the idea.
 * @param {string} req.body.text - The updated text of the idea.
 * @param {string} req.body.tag - The updated tag of the idea.
 * @param {string} req.body.username - The updated username associated with the idea.
 */
router.put('/:id', IdeasControllers.putIdea);

/**
 * Route to delete an existing idea by ID.
 * @route DELETE /ideas/:id
 * @param {string} req.params.id - The ID of the idea to be deleted.
 * @param {string} req.body.username - The username associated with the idea.
 */
router.delete('/:id', IdeasControllers.deletedIdea);

module.exports = router;
