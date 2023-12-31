import IdeasApi from "../services/IdeasApi";
class IdeaList{

    constructor(){
        this._ideaListEl=document.querySelector
            ('#idea-list');
        this._ideas=[];
        // [
        //     {
        //         id:1,
        //         text: 'ideas one',
        //         tag: 'Technology',
        //         username: 'john',
        //         date: new Date(),
        //     },
        //     {
        //         id:2,
        //         text: 'ideas two',
        //         tag: 'Inventions',
        //         username: 'Musa',
        //         date: new Date(),
        //     },
        //     {
        //         id:3,
        //         text: 'ideas three',
        //         tag: 'Software',
        //         username: 'Assane',
        //         date: new Date(),
        //     },
        //     {
        //         id:4,
        //         text: 'ideas three',
        //         tag: 'Business',
        //         username: 'Modou',
        //         date: new Date(),
        //     }
        // ];
        this.getIdeas();

        this._validTags=new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');

    }

    async getIdeas(){

        try{
            const res =await IdeasApi.getIdeas();
            this._ideas=res.data.data;
            console.log(this._ideas);
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
    render() {
        this._ideaListEl.innerHTML=this._ideas
            .map((idea)=>{
                const tagClass=this.getTagClass(idea.tag)
                return `
                <div class=card>
                <button class="delete"><i class="fas fa-times"></i></button>
                <h3>
                    ${idea.text}
                </h3>
                <p class="tag ${tagClass}">${idea.tag}</p>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
                </div>
                `
            }).join('')
    }
}
export default IdeaList;