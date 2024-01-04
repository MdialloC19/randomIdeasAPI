

class Modal{
    constructor(){
        this._modal=document.querySelector('#modal');
        this._modalBtn=document.querySelector('#modal-btn');
       
        this.addEventListeners();
    }
    addEventListeners(){
        this._modalBtn.addEventListener('click',this.open.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closemodal',()=>this.close());
        // this._updateBtn.addEventListener('click',this.open.bind(this));

    }

    open(){
        this._modal.style.display='block';
        const btn=document.querySelector('.btn');
        console.log(btn.dataset.id);

    }

    close(){
        this._modal.style.display='none';
    }

    outsideClick(e){
        if(e.target===this._modal){
            this.close();
        }
    } 
}

export default Modal;