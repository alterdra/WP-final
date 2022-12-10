import mongoose from 'mongoose'
const Schema = mongoose.Schema; 

const TestRecordSchema = new Schema({
  lecture: String,
  score: Number
});
const TestRecord = mongoose.model('TestRecord', TestRecordSchema); 
export default TestRecord;