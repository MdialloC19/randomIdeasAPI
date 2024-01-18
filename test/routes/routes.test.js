const request = require('supertest');
const baseURL = "http://localhost:8000";
const app = require('../../app'); 

describe('API Routes Testing', () => {
    it('Should be a function', ()=>{
        expect(typeof request(app).get).toBe('function');
    })

   it('Should return a number', async () => {
        const response = await request(app).get('/api/ideas');
        expect(typeof response.status).toBe('number');
    });

    // Test to fetch all ideas
    it('Should fetch all ideas', async () => {
        await request(app)
            .get('/api/ideas')
            .expect(200);
    });

    // Test to create a new idea
    it('Should create a new idea', async () => {
        await request(app)
            .post('/api/ideas')
            .send({ text: 'New idea', tag: 'Technology', username: 'MdialloC19' })
            .expect(201);
    });

    // Test to update an existing idea
    it('Should update an existing idea', async () => {
        // Assume that ideaId is the ID of an existing idea in your database
        const ideaId = '659a7a31100b2b2ae8a72f04'; 

        await request(app)
            .put(`/api/ideas/${ideaId}`)
            .send({ text: 'New Updated idea', tag: 'New tag', username:'MdialloC19' })
            .expect(200);

        await request(app)
            .put(`/api/ideas/${ideaId}`)
            .send({ text: 'Updated idea', tag: 'New tag',  username:'DifferentUser'})
            .expect(403);
    });

    // Test to delete an idea
    it('Should delete an idea', async () => {
        // Assume that ideaId is the ID of an existing idea in your database
        const ideaId = '659a7a3075fe538f82eb1545'; 
        // const ideaIdOther='65932ba772dcef3a04667f18';

        await request(app)
            .delete(`/api/ideas/${ideaId}`)
            .expect(403);
    });
});
