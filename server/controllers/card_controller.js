const FlashCard = require('../models/flashcard');

exports.createCard = async (req, res, next) => {

  console.log(req.body);
  console.log(req.body);

  const new_form = new FlashCard({
    front: req.body.front,
    back: req.body.back,
  });

  // await new_form.save((err, result) => {
  new_form.save((err, result) => {
    if (err) {
      console.log("error!" + err);
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ ...result._doc, _id: result.id });
    }
  });
};

exports.getCards = async (req, res, next) => {
  const Cards = await FlashCard.find().select('_id front back confidence');

  if (!Cards) {
    return res.status(400).json({ error: err });
  } else {
    console.log(Cards);
    return res.status(200).json({ output: Cards });
  }
};

