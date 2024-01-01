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
}

export default new IdeasApi();