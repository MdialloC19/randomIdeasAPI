const express= require('express');
const router=express.Router();
const Idea= require('../models/Idea');



// const ideas= [
//     {
//         id: 1,
//         ideas: 'total ok'
//     },
//     {
//         id:2,
//         ideas: 'total id :2'
//     },
//     {
//         id: 3,
//         ideas: "This new idea update",
//         tag: "technology",
//         username: "Woury",
//         date: "2023-12-22"
//     }
// ];


// Get All ideas
router.get('/', async (req,res)=>{
    try {
        const ideas= await Idea.find();
        res.status(200).json({succeed: true, data : ideas});
    } catch (error) {
        res.status(500).json({succeed:false, error: 'something went wrong!!!'});
        
    }
});

// Get Single idea
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        
        if (!idea) {
            return res.status(404).json({
                succeed: false,
                error: 'Idea not found',
            });
        }

        res.status(200).json({ succeed: true, data: idea });
    } catch (error) {
        res.status(500).json({ succeed: false, error: error.message });
    }
});


/*Post method */

// Add an Idea

router.post('/', async (req ,res)=>{
    const idea = new Idea({
        text: req.body.text,
        tag:req.body.tag,
        username: req.body.username,
        
    });

    try{
       const saveIdea= await idea.save();
        res.status(201).json({succeed: true, message: saveIdea});

    }catch (error) {
        res.status(500).json({succeed:false, error: 'something went wrong!!!'}); 
    }

});

// Update ideas

router.put('/:id', async (req, res) => {
    const { text, tag, username } = req.body;
    const updateFields = {};

    if (text) updateFields.text = text;
    if (tag) updateFields.tag = tag;
    if (username) updateFields.username = username;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ succeed: false, error: 'No fields to update' });
    }

    try {
        const updatedIdea = await Idea.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedIdea) {
            return res.status(404).json({ succeed: false, error: 'Idea not found' });
        }

        res.status(200).json({ succeed: true, data: updatedIdea });
    } catch (error) {
        res.status(500).json({ succeed: false, error: error.message });
    }
});



router.delete('/:id', (req, res) => {
    const ideaId = +req.params.id;
    const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);

    if (ideaIndex === -1) {
        return res.status(404).json({ succeed: false, message: 'Idea not found' });
    }

    ideas.splice(ideaIndex, 1);

    console.log(ideas);

    return res.status(204).json({ succeed: true, message: `Idea ${ideaId} deleted` });
});


module.exports=router;