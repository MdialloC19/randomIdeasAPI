const express=require('express');
const port=5000;
const app=express();
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

app.get('/', (req,res)=>{
    res.send({message :'Hello Word'});
});

app.get('/api/ideas', (req,res)=>{
    res.status(200).json({succeed: true, data : ideas});
});

app.get('/api/ideas/:id', (req,res)=>{
    const idea= ideas.find((idea)=>idea.id=== +req.params.id )

    if(!idea){
        return res.status(404).json({
            succeed :false,
            error: 'Idea not found',
        })
    }

    res.status(200).json({succeed: true, data : idea});
});

app.listen(port, ()=>console.log(`Server listening on port : ${port}`));