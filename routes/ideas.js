const express= require('express');

const router=express.Router();

const ideas= [
    {
        id: 1,
        ideas: 'total ok'
    },
    {
        id:2,
        ideas: 'total id :2'
    },
    {
        id: 3,
        ideas: "This new idea update",
        tag: "technology",
        username: "Woury",
        date: "2023-12-22"
    }
];


// Get All ideas
router.get('/', (req,res)=>{
    res.status(200).json({succeed: true, data : ideas});
});

// Get Single idea
router.get('/:id', (req,res)=>{
    const idea= ideas.find((idea)=>idea.id=== +req.params.id )

    if(!idea){
        return res.status(404).json({
            succeed :false,
            error: 'Idea not found',
        })
    }
    res.status(200).json({succeed: true, data : idea});
});

/*Post method */

// Add an Idea

router.post('/', (req ,res)=>{
    const idea ={
        id: 3,
        ideas: req.body.text,
        tag:req.body.tag,
        username: req.body.username,
        date:new Date().toISOString().slice(0,10),
    }
   
    ideas.push(idea)
    console.log(idea)
    res.status(201).json({succeed: true, message: idea});


});

// Update ideas

router.put('/:id', (req, res) => {
    const ideaId = +req.params.id;
    const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);

    if (ideaIndex === -1) {
        return res.status(404).json({ succeed: false, message: 'Idea not found' });
    }

    const updatedIdea = {
        id: ideaId,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10),
    };

    ideas[ideaIndex] = updatedIdea;

    console.log(updatedIdea);
    res.status(200).json({ succeed: true, message: updatedIdea });
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