const Idea=require('../models/Idea');
const {isValidObjectId}=require('mongoose');



exports.getAllIdeas= async (res,req)=>{
        try {
            const ideas= await Idea.find();
            res.status(200).json({
                succeed: true,
                data:ideas
            }); 
        } catch (error) {
            res.status(500).json({ succeed: false, error: 'Something went wrong' });
            console.log(error)
        }
        
    }

exports.getIdea  =async (res,req)=>{
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

exports.postIdea=async (res,req)=>{
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
