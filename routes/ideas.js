const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const mongoose = require('mongoose');
const { isValidObjectId } = require('mongoose');
const IdeasControllers = require('../controllers/IdeasControllers');

router.get('/', IdeasControllers.getAllIdeas);
router.get('/:id', IdeasControllers.getIdea);
router.post('/', IdeasControllers.postIdea);
/**
 * @route PUT /ideas/:id
 * @description Update an existing idea by its ID
 * @access Public
 */


router.put('/:id', async (req, res) => {

    try {
        const ideaId = req.params.id;
        const idea=await Idea.findById(ideaId);
        if(idea.username===req.body.username){

            const { text, tag, username } = req.body;
            const updateFields = {};
        
            if (!isValidObjectId(ideaId)) {
                return res.status(400).json({ succeed: false, error: 'Invalid Idea ID' });
            }
            if (text) updateFields.text = text;
            if (tag) updateFields.tag = tag;
            if (username) updateFields.username = username;
        
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ succeed: false, error: 'No fields to update' });
            }
            const updatedIdea = await Idea.findOneAndUpdate(
                { _id: ideaId },
                { $set: updateFields },
                { new: true }
            );
            if (updatedIdea === null) {
                return res.status(404).json({ succeed: false, error: 'Idea not found' });
            }
            res.status(200).json({ succeed: true, data: updatedIdea });
        }else{
            // Username don't match
            res.status(403).json({ succeed: false, error: 'you are not autorized to delete this ressource' });
        }
       
    } catch (error) {
        res.status(500).json({ succeed: false, error: error.message });
    }
});



/**
 * @route DELETE /ideas/:id
 * @description Delete an idea by its ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const idea=await Idea.findById(req.params.id);
        if(idea.username===req.body.username){
            const ideaId = req.params.id;
            if (!isValidObjectId(ideaId)) {
                return res.status(400).json({ succeed: false, error: 'Invalid idea ID' });
            }
            const deletedIdea = await Idea.findOneAndDelete({ _id: ideaId });
            if (!deletedIdea) {
                return res.status(404).json({ succeed: false, error: 'Idea not found' });
            }
            res.status(200).json({ succeed: true, data: deletedIdea });
        }else{
            res.status(403).json({ succeed: false, error: 'you are not autorized to delete this ressource' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ succeed: false, error: error.message });
    }
});

module.exports = router;
