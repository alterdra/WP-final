import mongoose from 'mongoose'

const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    password: String,
    learnSets: [{ type: mongoose.Types.ObjectId, ref: 'LearnSet' }],
    tests: [{ type: mongoose.Types.ObjectId, ref: 'TestRecord' }],
});
const User = mongoose.model('User', UserSchema); 

export default User;