const Idea=require('../models/Idea');
const {isValidObjectId}=require('mongoose');

class IdeasControllers {

    constructor(){
    }

    async getAllIdeas(res,req){
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

    async getIdea(res,req){
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

}

module.exports=IdeasControllers;