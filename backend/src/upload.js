import LearnSet from "./models/learnSet";
import WordCard from "./models/wordCard";
import User from "./models/user";
import Data from '../data.json'

const validateUser = async (name) => {
    let user = await User.findOne({ name });
    if(!user) return user;
    return user.populate(["learnSets"]);
}

const dataInit = async ({ userName }) => {
    try {
        const user = await validateUser(userName);
        if(!user) {
            console.log("Not verified");
            return;
        }
        for(const { name, cards } of Data){
            const existing = user.learnSets.find(ele => ele.name === name);
            if(!existing){
                // Add Learnset
                const user = await validateUser(userName);
                console.log(user);
                const newLearnSet = new LearnSet({ name });
                await newLearnSet.save();
                user.learnSets.push(newLearnSet);
                await user.save();
                console.log(`Learnset ${name} added.`);

                //Add cards
                console.log(user, name);
                let learnSet = user.learnSets.find(ele => ele.name === name);
                learnSet = await learnSet.populate(["cards"]);
                console.log(learnSet);
                for(const card of cards){
                    const newCard = new WordCard(card);
                    await newCard.save();
                    learnSet.cards.push(newCard);
                }
                await learnSet.save();
            }
            else{
                console.log(`The set ${name} already exists.` );
            }
        }
    }
    catch (err) {
        console.log(`Fail to init data.`);
    }
}

export default dataInit;