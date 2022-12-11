import { Router } from "express";
import TestRecord from "../models/testRecord";

const router = Router();

const addTestRecord = async (req, res) => {
    const lecture = req.body.lecture;
    const score = req.body.score;
    const id = req.body.id;
    console.log(lecture, score, id);
    try {
        const newTestRecord = new TestRecord({ lecture, score, id });
        await newTestRecord.save();
        res.status(200).send({ msg: "Testrecord added."});
    } catch (err) {
        res.status(500).send({ msg: "Fail to add testrecord." });
    }
}

const findTestRecord = async (req, res) => {
    try {
        const allTestRecords = await TestRecord.find({});
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
    // console.log(req)
    try {
        const tests = await TestRecord.deleteOne({ id });
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