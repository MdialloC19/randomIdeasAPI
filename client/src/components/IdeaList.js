import IdeasApi from "../services/IdeasApi";
import Modal from "./Modal";
import IdeaForm from "./IdeaForm";
class IdeaList{

    constructor(){
        this._ideaListEl=document.querySelector
            ('#idea-list');
        this._ideas=[];
        this.updateBtn=[];
        this.modal=new Modal();
        this.ideaform=new IdeaForm();
        this.getIdeas();

        this._validTags=new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');

    }

    addEventListeners(){

        this._ideaListEl.addEventListener('click', (e)=>{
            if(e.target.classList.contains('fa-times')){
                e.stopImmediatePropagation();
                const ideaId=e.target.closest('.card').dataset.id;
                console.log(ideaId);
                this.deleteIdea(ideaId);
            }
        });

        this.updateBtn.forEach((update)=>{
            update.addEventListener('click', (e)=>{
                const ideaId=e.target.closest('.card').dataset.id;
                // console.log(ideaId);
                // console.log(this);
                this.ideaform.update({
                    type:true,
                    id: ideaId
                });
                this.modal.open();
                
            });
        })

    }

    async getIdeas(){

        try{
            const res =await IdeasApi.getIdeas();
            this._ideas=res.data.data;
            this.render();
        }catch(error){
            console.log(error)
        }

    }

    getTagClass(tag){
        tag=tag.toLowerCase()
        let tagClass= '';
        if(this._validTags.has(tag)){
            tagClass=`tag-${tag}`;
        };
       return tagClass;
    }

   
    async deleteIdea(id){
        try {
            const res=await IdeasApi.deleteIdea(id);
             this.getIdeas();
        } catch (error) {
            alert('You can delete this ressource');
        }

    }
   

    render() {
       
        this._ideaListEl.innerHTML=this._ideas
            .map((idea)=>{
                const tagClass=this.getTagClass(idea.tag)
                const deleteBtn= idea.username===localStorage.getItem('username')
                    ?`<button class="delete"><i class="fas fa-times"></i></button>`
                    :'';
                return `
                <div class=card data-id="${idea._id}">
                ${deleteBtn}
                <h3>
                    ${idea.text}
                </h3>
                <p class="tag ${tagClass}">${idea.tag}</p>
                <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
                </p>
                <button class="btn-update">Update</button>
                </div>
                `
            }).join('');
        this.updateBtn=document.querySelectorAll('.btn-update');
        console.log(this.updateBtn);

        this.addEventListeners();
       
    }
}
export default IdeaList;