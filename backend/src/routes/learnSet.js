import { Router } from "express";
import LearnSet from "../models/learnSet";
import WordCard from "../models/wordCard";
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

const addLearnSet = async (req, res) => {
    const lectureName = req.body.Name;
    const userName = req.body.User;
    console.log(lectureName, userName);
    try {
        const user = await validateUser(userName);
        const existing = user.learnSets.find(ele => ele.name === lectureName);
        if(!existing){
            const newLearnSet = new LearnSet({ name: lectureName });
            await newLearnSet.save();
            user.learnSets.push(newLearnSet);
            await user.save();
            res.status(200).send({ msg: "Learnset added." });
        }
        else{
            res.status(200).send({ msg: "The set already exists." });
        }
    } catch (err) {
        res.status(500).send({ msg: "Fail to add a set." });
    }
}
const findLearnSet = async (req, res) => {
    const userName = req.query.User;
    try {
        const user = await validateUser(userName);
        const allLearnSets = user.learnSets;
        if(!allLearnSets){
            res.status(200).send({ 
                msg: "Currently no Learnsets",
                contents: [],
            });
        }
        else{
            res.status(200).send({ 
                msg: "Find sets successfully.",
                contents: allLearnSets,
            });
        }
    } catch (err) {
        res.status(500).send({ msg: "Fail to find sets" });
    }
}
const deleteLearnSet = async (req, res) => {
    const lecture = req.body.Name;
    const userName = req.body.User;
    try {
        const user = await validateUser(userName);
        console.log(user.learnSets);
        const _id = user.learnSets.find(ele => ele.name === lecture)._id;
        const learnset = await LearnSet.findOne({ _id });
        const success = await LearnSet.deleteOne({ _id });
        console.log(learnset);
        user.learnSets = user.learnSets.filter(ele => ele._id !== _id);
        await user.save();
        if (!success) {
            res.status(500).send({ msg: "Fail to delete cards in the lecture" });
            return;
        }
        else {
            const delete_id = learnset.cards;
            console.log(delete_id);
            await WordCard.deleteMany({ _id: { $in: delete_id } });
            res.status(200).send({ 
                msg: "Delete set successfully.",
            });
        }
    } catch (err) {
        res.status(500).send({ msg: "Fail to delete the set" });
    }
}


router.post("/lecture", (req, res) => {
    addLearnSet(req, res);
})
router.get("/lectures", (req, res) => {
    findLearnSet(req, res);
});
router.delete("/lecture", (req, res) => {
    deleteLearnSet(req, res);
});
export default router;