import { Router } from "express";
import User from "../models/user";
import dataInit from "../upload";
import bcrypt from 'bcrypt';

const router = Router();

const addAccount = async (req, res) => {
    const name = req.body.user;
    let password = req.body.password;
    password = await bcrypt.hash(password, 12);
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
    let password = req.query.password;
    try{
        let user = await User.findOne({ name });
        const valid = await bcrypt.compare(password, user.password);
        console.log(valid);
        if(!valid){
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
            msg: "Verify account fails.",
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