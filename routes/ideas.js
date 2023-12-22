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


})


module.exports=router;