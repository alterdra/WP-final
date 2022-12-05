import { Router } from "express";
import LearnSet from "../models/learnSet";
import WordCard from "../models/wordCard";

const router = Router();

const addLearnSet = async (req, res) => {
    const lectureName = req.body.Name;
    console.log(lectureName);
    try {
        const existing = await LearnSet.findOne({ name: lectureName });
        if(!existing){
            const newLearnSet = new LearnSet({ name: lectureName });
            await newLearnSet.save();
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
    // console.log('in findLearnSet');
    try {
        const allLearnSets = await LearnSet.find({});
        if(!addLearnSet){
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
    // console.log(req)
    try {
        const cards = await WordCard.deleteMany({ lecture });
        const learnSet = await LearnSet.deleteOne({ name: lecture })
        if (!cards || !learnSet) {
            res.status(500).send({ msg: "Fail to delete cards in the lecture" });
            return;
        }
        res.status(200).send({ 
            msg: "Delete set successfully.",
        });
    } catch (err) {
        res.status(500).send({ msg: "Fail to find sets" });
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