const Idea=require('../models/Idea');
const {isValidObjectId}=require('mongoose');

exports.getAllIdeas= async (req,res)=>{
        try {
            const ideas= await Idea.find();
            res.status(200).json({
                succeed: true,
                data:ideas
            }); 
        } catch (error) {
            res.status(500).json({
                succed:false,
                error: 'Sommething went Wrong!!!'
            });
            console.log(error)
        }
        
    }

exports.getIdea=async (req,res)=>{
        try {
            const ideaId=req.params.id;
            if(!isValidObjectId(ideaId)){
                return res.status(400).json({
                    succeed:false,
                    error :'Invalid Id '
                });
            }
            const idea=await Idea.findById(ideaId);
            if(idea){
                return res.status(404).json({
                    succeed:false,
                    error :'Idea not found'
                });
            }
            res.status(200).json({
                succeed: true,
                data:idea
            });
            
        } catch (error) {
            res.status(500).json({
                succed:false,
                error: 'Sommething went Wrong!!!'
            });
            console.log(error);
        }
    }

exports.postIdea=async (req,res)=>{
    const { text, tag, username } = req.body;
    const idea = new Idea({ text, tag, username });
    try {
        savedIdea=await idea.save();
        res.status(201).json({
            succed:true,
            data: savedIdea,
        });
        
    } catch (error) {
        res.status(500).json({
            succed:false,
            error: 'Something went Wrong'
        });
        console.log(error);
    }
}

exports.putIdea=async (req,res)=>{
    try {
        const ideaId= req.params.id;
        const idea=await Idea.findById(ideaId);

        if (!isValidObjectId(ideaId)) {
            return res.status(400).json({
                succeed: false,
                error: 'Invalid Idea ID'
            });
        }

        if(idea.user===req.params.username){
            const { text, tag, username } = req.body;
            const updateFields = {};

            if (text) updateFields.text = text;
            if (tag) updateFields.tag = tag;
            if (username) updateFields.username = username;

            if(Object.keys(updateFields).length===0){
                return res.status(400).json({
                    succed: false,
                    error : 'No field to update'
                });
            }

            const updatedIdea=await Idea.findByIdAndUpdate({
                id:ideaId,
                $set:updateFields,
                new:true
            });

            if (updatedIdea === null) {
                return res.status(404).json({ succeed: false, error: 'Idea not found' });
            }
            res.status(200).json({ succeed: true, data: updatedIdea });

        }else{
            res.status(403).json({
                succed: false,
                error: 'you are not autorized to delete this ressource'
            });
        }
    } catch (error) {
        res.status(500).json({
            succed:false,
            error:'Something went wrong'+ error.message
        });
        console.log(error);
    }
}

exports.deletedIdea=async (req,res)=>{
    try {
        const ideaId=req.params.id;
        if(!isValidObjectId(ideaId)){
            return res.status(400).json({
                succed:false,
                error : 'Invalid Id'
            });
        }
        const idea=await Idea.findById(ideaId);

        if(!idea){
            return res.json(404).json({
                succed:false,
                error: 'Idea not found !!!'
            });
        }

        if(idea.username===req.body.username){
            const deletedIdea =await Idea.findByIdAndDelete(ideaId);
            res.status(200).json({
                succed:true,
                data:deletedIdea
            });

        }else{
            res.status(403).json({
                succed: false,
                error: 'you are not autorized to delete this ressource'
            });
        }
    } catch (error) {
        res.status(500).json({
            succed:false,
            error:'Something went wrong'+ error.message
        });
       console.log(error);
    }
}
