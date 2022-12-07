import { Router } from "express";
import WordCard from "../models/wordCard";

const router = Router();

const deleteCard = async (req, res) => {
    const Japanese = req.body.Japanese;
    const Chinese = req.body.Chinese;
    try {
        await WordCard.deleteOne({ vocab: { Chinese, Japanese } });
        res.status(200).send({ msg: "The card is deleted." });
    } catch (err) {
        res.status(500).send({ msg: "Fail to clear the card." });
    }    
}

const addCard = async (req, res) => {
    const { lecture, vocab: { Japanese, Chinese } } = req.body;
    console.log(lecture, Japanese, Chinese);
    const vocab = { Japanese, Chinese };
    try {
        const existing = await WordCard.findOne({ lecture, vocab });
        if (!existing) {
            const newCard = new WordCard({ lecture, vocab });
            await newCard.save();
            res.status(200).send({ msg: "Card added." });
        } else{
            await WordCard.updateOne({ lecture, vocab });
            res.status(200).send({ msg: "Card updated." });
        }
    } catch (err) {
        res.status(500).send({ msg: "Fail to add/update a card." });
    }
}

const findCards = async (req, res) => {
    const { lecture } = req.query;
    // console.log(lecture)
    try {
        const cards = await WordCard.find({ lecture });
        res.status(200).send({ 
            msg: "Find cards successfully.",
            contents: cards
        });
    } catch (err) {
        res.status(500).send({ msg: "Fail to find cards" });
    }
}

router.delete("/cards",(req, res)=>{
    deleteCard(req, res);
}); 
router.post("/card", (req,  res) => {
    addCard(req, res);
});
router.get("/cards", (req, res)=>{
    findCards(req, res);
});

export default router;