import { Router } from "express";
import TestRecord from "../models/testRecord";
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

const addTestRecord = async (req, res) => {
    const lecture = req.body.lecture;
    const score = req.body.score;
    const id = req.body.id;
    const userName = req.body.User;
    console.log(lecture, score, id, userName);
    try {
        const newTestRecord = new TestRecord({ lecture, score, id });
        await newTestRecord.save();
        const user = await validateUser(userName);
        user.tests.push(newTestRecord);
        await user.save();
        res.status(200).send({ msg: "Testrecord added."});
    } catch (err) {
        res.status(500).send({ msg: "Fail to add testrecord." });
    }
}

const findTestRecord = async (req, res) => {
    const userName = req.query.User;
    try {
        const user = await validateUser(userName);
        const allTestRecords = user.tests;
        if(!allTestRecords){
            res.status(200).send({ 
                msg: "Currently no TestRecord",
                contents: [],
            });
        }
        else{
            res.status(200).send({ 
                msg: "Find testrecords successfully.",
                contents: allTestRecords,
            });
        }
    } catch (err) {
        res.status(500).send({ msg: "Fail to find testrecords" });
    }
}

const deleteTestRecord = async (req, res) => {
    const id = req.body.id;
    const userName = req.body.User;
    try {
        const tests = await TestRecord.deleteOne({ id });
        const user = await validateUser(userName);
        user.tests = user.tests.filter(ele => ele.id !== id);
        await user.save();
        if (!tests) {
            res.status(500).send({ msg: "Fail to delete testrecord" });
            return;
        }
        res.status(200).send({ 
            msg: "Delete testrecord successfully.",
        });
    } catch (err) {
        res.status(500).send({ msg: "Fail to delete testrecord" });
    }
}

router.delete("/test",(req, res) => {
    deleteTestRecord(req, res);
}); 
router.post("/test", (req,  res) => {
    addTestRecord(req, res);
});
router.get("/tests", (req, res) => {
    findTestRecord(req, res);
});

export default router;