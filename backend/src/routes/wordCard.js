import { Router } from "express";
import WordCard from "../models/wordCard";

const router = Router();

const deleteDB = async (res) => {
    try {
        await WordCard.deleteMany({});
        res.status(200).send({ msg: "Database cleared." });
    } catch (err) {
        res.status(500).send({ msg: "Fail to clear database." });
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
    try {
        const cards = await WordCard.find({});
        res.status(200).send({ 
            msg: "Find cards successfully.",
            contents: cards
        });
    } catch (err) {
        res.status(500).send({ msg: "Fail to find cards" });
    }
}

router.delete("/cards",(req, res)=>{
    deleteDB(res);
}); 
router.post("/card", (req,  res) => {
    addCard(req, res);
});
router.get("/cards", (req, res)=>{
    findCards(req, res);
});

export default router;