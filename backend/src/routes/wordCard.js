import { Router } from "express";
import WordCard from "../models/wordCard";
import LearnSet from "../models/learnSet";
import User from "../models/user";

const router = Router();

const validateUser = async (name) => {
    let user = await User.findOne({ name });
    if(!user){
        user = new User({ name });
        await user.save();
    }
    return user.populate(["learnSets", "tests"]);
}

const deleteCard = async (req, res) => {
    const Japanese = req.body.Japanese;
    const Chinese = req.body.Chinese;
    const userName = req.body.userName;
    const learnsetName = req.body.lecture;
    try {
        const user = await validateUser(userName);
        let learnSet = user.learnSets.find(ele => ele.name === learnsetName);
        learnSet = await learnSet.populate(["cards"]);
        const wordCard = learnSet.cards.find(ele => ele.Chinese === Chinese && ele.Japanese === Japanese);
        await WordCard.deleteOne({ _id: wordCard._id });
        learnSet.cards = learnSet.cards.filter(ele => ele._id !== wordCard._id);
        await learnSet.save();
        res.status(200).send({ msg: "The card is deleted." });
    } catch (err) {
        res.status(500).send({ msg: "Fail to clear the card." });
    }    
}

const addCard = async (req, res) => {
    const { lecture, Japanese, Chinese, userName } = req.body;
    console.log(lecture, Japanese, Chinese, userName);
    try {
        const user = await validateUser(userName);
        let learnSet = user.learnSets.find(ele => ele.name === lecture);
        learnSet = await learnSet.populate(["cards"]);
        console.log(learnSet);
        const card = learnSet.cards.find(ele => ele.Chinese === Chinese && ele.Japanese === Japanese);
        if (!card) {
            const newCard = new WordCard({ Chinese, Japanese, Learned: false });
            await newCard.save();
            learnSet.cards.push(newCard);
            await learnSet.save();
            res.status(200).send({ msg: "Card added." });
        } else{
            res.status(200).send({ msg: "Card already existed." });
        }    
    } catch (err) {
        res.status(500).send({ msg: "Fail to add/update a card." });
    }
}

const findCards = async (req, res) => {
    const lectureName = req.query.lecture;
    const userName = req.query.userName;
    // console.log(lecture)
    try {
        const user = await validateUser(userName);
        let learnSet = user.learnSets.find(ele => ele.name === lectureName);
        learnSet = await learnSet.populate(["cards"]);
        res.status(200).send({ 
            msg: "Find cards successfully.",
            contents: learnSet.cards
        });
    } catch (err) {
        res.status(500).send({ msg: "Fail to find cards" });
    }
}

const updateCard = async (req, res) => {
    const Japanese = req.body.Japanese;
    const Chinese = req.body.Chinese;
    const userName = req.body.userName;
    const lecture = req.body.lecture;
    try {
        const user = await validateUser(userName);
        let learnSet = user.learnSets.find(ele => ele.name === lecture);
        learnSet = await learnSet.populate(["cards"]);
        const card = learnSet.cards.find(ele => ele.Chinese === Chinese && ele.Japanese === Japanese);
        if (!card) {
            res.status(200).send({ msg: "error!!" });
        } else{
            await WordCard.updateOne({ _id: card._id }, { Learned: !card.Learned });
            res.status(200).send({ msg: "Card updated" });
        }   
    } catch (err) {
        res.status(500).send({ msg: "Fail to update a card." });
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
router.post("/learn", (req, res) => {
    updateCard(req, res);
})

export default router;