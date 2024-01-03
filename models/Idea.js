/**
 * @typedef {Object} Idea
 * @property {string} text - The text of the idea.
 * @property {string} [tag] - The tag of the idea.
 * @property {string} [username] - The username associated with the idea.
 * @property {Date} [date] - The creation date of the idea.
 */

/**
 * @typedef {import('mongoose').Schema} Schema
 * @typedef {import('mongoose').Model<Idea>} IdeaModel
 */

const mongoose = require('mongoose');

/**
 * Schema for an idea.
 * @type {Schema<IdeaModel>}
 */
const IdeaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text field'],
    },
    tag: {
        type: String,
    },
    username: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

/**
 * @type {IdeaModel}
 */
module.exports = mongoose.model('Idea', IdeaSchema);
