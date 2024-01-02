class spinner {

    constructor(){
        this.spinner=document.querySelector('.spinner'); 
    }

    // Function Show Spinner

    showSpinner(){
        this.spinner.classList.add('show');

    }
    // Hide Spinner

    hideSpinner(){
       this.spinner.classList.remove('show');

    }
}

export default spinner;