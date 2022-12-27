import { Router } from "express";
import User from "../models/user";

const router = Router();

const addAccount = async (req, res) => {
    const name = req.post.user;
    const password = req.post.password;
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

const verifyAccount = async (req, res) => {
    const name = req.query.user;
    const password = req.query.password;
    let user = await User.findOne({ name, password });
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

router.post("/signup", (req,  res) => {
    addAccount(req, res);
});
router.get("/login", (req, res) => {
    verifyAccount(req, res);
});

export default router;