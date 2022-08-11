const FlashCard = require('../models/flashcard');

///////////////////////////////////////////////////////////////////////////////
//                            Middleware function                            //
///////////////////////////////////////////////////////////////////////////////
exports.createCard = async (req, res, next) => {
    /**
     * Basically with the controller we want to:
     * - Have function to add/create a card.
     * - Have function to retrieve all cards (in deck).
     * @param req - request argument to the middleware function.
     * @param res - the response argument to the middleware function
     * @param next - Callback argument to the middleware function

     * @returns nothing
     */

    console.log(req.body);

    // Create a new flashcard using FlashCard schema
    const new_form = new FlashCard({
        front: req.body.front,
        back: req.body.back,
    });

    // Upon saving the form catch the error and display the error
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
    ///////////////////////////////////////////////////////////////////////////
    //                      Get the card by using select                     //
    ///////////////////////////////////////////////////////////////////////////

    // We want the front, back and confidence to be displayed to the user.
    // We need _id to update the card
    const Cards = await FlashCard.find().select('_id front back confidence');

    if (!Cards) {
        return res.status(400).json({ error: err });
    } else {
        console.log(Cards);
        return res.status(200).json({ output: Cards });
    }
};

