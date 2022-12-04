import mongoose from 'mongoose'
const Schema = mongoose.Schema; 

const WordCardSchema = new Schema({
  lecture: String,
  lectureID: Number,
  vocab: String,
  vocabID: Number,
});
const WordCard = mongoose.model('WordCard', WordCardSchema); 
export default WordCard;