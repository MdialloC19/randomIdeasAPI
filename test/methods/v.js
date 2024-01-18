const request = require('supertest');
const app = require('../../server'); // Remplacez cela par le chemin de votre fichier d'application Express
const Idea = require('../../models/Idea'); // Importez votre modèle Idea
const testPort=8000;

describe('Test de la fonction putIdea', () => {
    // beforeAll((done) => {
    //     app.listen(testPort, () => {
    //         console.log(`Serveur de test démarré sur le port ${testPort}`);
    //         done();
    //     });
    // });

    // afterAll((done) => {
    //     app.close(() => {
    //         console.log('Serveur de test arrêté');
    //         done();
    //     });
    // });
    it('Devrait mettre à jour une idée existante', async () => {
        // Créez une idée fictive pour la tester
        const idea = new Idea({ text: 'Idee de test', tag: 'Test', username: 'utilisateur1' });
        await idea.save(); // Enregistrez l'idée fictive dans la base de données

        // Envoyez une requête pour mettre à jour l'idée
        const updatedData = { text: 'Idee mise à jour', tag: 'Test mis à jour', username: 'utilisateur1' };
        const response = await request(app)
            .put(`/api/ideas/${idea._id}`) // Remplacez cela par votre route réelle
            .send(updatedData)
            .expect(200);

        // Vérifiez la réponse
        expect(response.body.succeed).toBe(true);
        expect(response.body.data.text).toBe(updatedData.text);
        expect(response.body.data.tag).toBe(updatedData.tag);
        expect(response.body.data.username).toBe(updatedData.username);

        // Vérifiez si l'idée a bien été mise à jour dans la base de données
        const updatedIdea = await Idea.findById(idea._id);
        expect(updatedIdea.text).toBe(updatedData.text);
        expect(updatedIdea.tag).toBe(updatedData.tag);
        expect(updatedIdea.username).toBe(updatedData.username);
    });
    // Ajoutez d'autres tests pour couvrir d'autres cas si nécessaire
});
