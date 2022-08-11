const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flashCardSchema = new Schema({
    /**
     * Schema for each flashcard document inside mongodb
     */

    front: {
        type: String, // Type needs to be a string
        default: "", // default value
        required: true // Is required
    },

    back: {
        type: String,
        default: "",
        required: true
    },
    confidence: {
        type: Number,
        default: 0,
        required: false
    },
});

module.exports = mongoose.model('FlashCard', flashCardSchema);
