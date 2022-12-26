import mongoose from 'mongoose'

const Schema = mongoose.Schema; 

const WordCardSchema = new Schema({
  Chinese: String, 
  Japanese: String,
  Learned: Boolean,
});
const WordCard = mongoose.model('WordCard', WordCardSchema);

export default WordCard;