import Modal from "./Modal";
import IdeaList from "./IdeaList";
import IdeasApi from "../services/IdeasApi";
import Spinner from "./spinner";

class IdeaForm{

    constructor(){
      this._update={
        type:false,
        id:'',
      }
      this._formModal=document.querySelector
      ('#form-modal');
      this.modal=new Modal();
     

    }

    addEventListeners(){
      this._form.addEventListener('submit', this.
      handleSubmit.bind(this));
    }
    update(update){
      this._update=update;
      this.render();
    }

    handleSubmit(e){
      e.preventDefault();
      if(!this._form.elements.text.value ||!this._form.elements.tag.value
          || !this._form.elements.username.value ){
            alert('Please enter all fill');
            return;
          }
      // Add idea to server
      localStorage.setItem('username',
        this._form.elements.username.value);
       
      const idea ={
        text:this._form.elements.text.value,
        tag:this._form.elements.tag.value,
        username:this._form.elements.username.value,
      }

      if(this._update.type){
        this.updateIdea(this._update.id,idea );
      }else{
        this.postIdeas(idea);
      }

     
      // This below line, allow us to display ideas after added it on server side 
      new IdeaList().getIdeas();
      this._form.elements.text.value=''
      this._form.elements.tag.value=''
      this._form.elements.username.value=''
      this.render();
      document.dispatchEvent(new Event('closemodal'));// for closing the modal after submit
    }

    async postIdeas(idea){
       try {
          const res=await IdeasApi.postIdeas(idea);
         
          console.log(res);
       } catch (error) {
          console.log(error)
       }
    }

    async updateIdea(id,idea){
      try{
        const res=await IdeasApi.updateIdea(id, idea)
        console.log(res);
      }catch(error){
        console.log(error);
      }
    }
   

    render(){
      this._formModal.innerHTML=`<form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username"
          value="${localStorage.getItem('username')? localStorage.getItem('username'): ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit" data-id='${this._update.type?this._update.id:''}'>Submit</button>
      </form>`;

      this._form=document.querySelector('#idea-form');
      this.addEventListeners();
    }
    

}

export default IdeaForm;