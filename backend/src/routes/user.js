import { Router } from "express";
import User from "../models/user";
import dataInit from "../upload";

const router = Router();

const addAccount = async (req, res) => {
    const name = req.body.user;
    const password = req.body.password;
    try{
        let user = await User.findOne({ name });
        if(!user){
            user = new User({ name, password });
            await user.save();
            res.status(200).send({ 
                msg: "Sign up succeeded",
            });
        }
        else{
            res.status(200).send({
                msg: "the ID is already in used, please try another one",
            });
        }
    }
    catch {
        res.status(500).send({
            msg: "Add account fails.",
        });
    }
}

const verifyAccount = async (req, res) => {
    const name = req.query.user;
    const password = req.query.password;
    let user = await User.findOne({ name, password });
    try{
        if(!user){
            res.status(200).send({
                msg: "Wrong ID or Password",
            });
        }
        else{
            res.status(200).send({
                msg: "Login Successfully",
            });
        }
    }
    catch {
        res.status(500).send({
            msg: "Add account fails.",
        });
    }
    dataInit({userName: name});
}

router.post("/signup", (req,  res) => {
    addAccount(req, res);
});
router.get("/login", (req, res) => {
    verifyAccount(req, res);
});

export default router;