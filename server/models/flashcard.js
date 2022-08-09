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
  confidence: {
    type: Number,
    default: 0,
    required: false
  },
});

module.exports = mongoose.model('FlashCard', flashCardSchema);
