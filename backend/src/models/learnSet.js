import mongoose from 'mongoose'

const Schema = mongoose.Schema; 

const LearnSetSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    cards: [{ type: mongoose.Types.ObjectId, ref: 'WordCard' }],
});
const LearnSet = mongoose.model('LearnSet', LearnSetSchema); 

export default LearnSet;