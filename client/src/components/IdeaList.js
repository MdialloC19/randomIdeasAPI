import IdeasApi from "../services/IdeasApi";
class IdeaList{

    constructor(){
        this._ideaListEl=document.querySelector
            ('#idea-list');
        this._ideas=[];
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
    }

    async getIdeas(){

        try{
            const res =await IdeasApi.getIdeas();
            this._ideas=res.data.data;
            // console.log(this._ideas);
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
                <button class="btn-update">Update</button>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
                </div>
                `
            }).join('');
        this.addEventListeners();
       
    }
}
export default IdeaList;