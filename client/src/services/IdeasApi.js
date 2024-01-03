import axios from 'axios';

/**
 * Class representing an API interface for managing ideas.
 */
class IdeasApi {
    /**
     * Create an IdeasApi instance.
     */
    constructor() {
        /**
         * The base URL for the ideas API endpoint.
         * @type {string}
         * @private
         */
        this._apiUrl = '/api/ideas';
    }

    /**
     * Retrieve a list of ideas from the API.
     * @returns {Promise} A Promise containing the ideas data.
     */
    getIdeas() {
        return axios.get(this._apiUrl);
    }

    /**
     * Add a new idea to the API.
     * @param {Object} idea - The idea object to be added.
     * @returns {Promise} A Promise indicating the success of the operation.
     */
    postIdeas(idea) {
        return axios.post(`${this._apiUrl}`, idea);
    }

    /**
     * Update an existing idea in the API.
     * @param {string} id - The ID of the idea to be updated.
     * @param {Object} idea - The updated idea data.
     * @returns {Promise} A Promise indicating the success of the operation.
     */
    updateIdea(id, idea) {
        return axios.put(`${this._apiUrl}/${id}`, idea);
    }

    /**
     * Delete an idea from the API.
     * @param {string} id - The ID of the idea to be deleted.
     * @returns {Promise} A Promise indicating the success of the operation.
     */
    deleteIdea(id) {
        const username = localStorage.getItem('username') || '';
        return axios.delete(`${this._apiUrl}/${id}`, {
            data: { username },
        });
    }
}

export default new IdeasApi();
