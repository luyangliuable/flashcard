const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const flashCardSchema = new Schema({
    front: {
        type: String,
        default: "",
        required: false
    },
    back: {
      type: String,
      default: "",
      required: false
    },
});

module.exports = mongoose.model('FlashCard', flashCardSchema);
