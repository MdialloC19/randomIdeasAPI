import axios from 'axios';

class IdeasApi{

    constructor(){
        this._apiUrl='http://localhost:8000/api/ideas';
    }

    getIdeas(){
        return axios.get(this._apiUrl);
    }

    postIdeas(idea){
        return axios.post(`${this._apiUrl}`, idea);
    }
    
    updateIdea(id,idea){
        return axios.put(`${this._apiUrl}/${id}`, idea);

    }
    deleteIdea(id){
        const username= localStorage.getItem('username') ?
            localStorage.getItem('username'):  '';
        return axios.delete(`${this._apiUrl}/${id}`, {
                data :{
                    username,
                }
            }
        );

    }
}

export default new IdeasApi();