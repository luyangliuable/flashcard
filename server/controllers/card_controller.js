const FlashCard = require('../models/flashcard');

exports.createCard = async (req, res, next) => {

  const new_form = new FlashCard({
    front: req.body,
    back: "dsasdsda",
  });

  await new_form.save((err, result) => {
    if (err) {
      console.log("error!" + err);
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ ...result._doc, _id: result.id });
    }
  });
};
