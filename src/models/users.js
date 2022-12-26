const mongoose = require('mongoose')
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {type:String, unique: true},
    ticketNo: Number
  },
  { collection: 'users' });

module.exports= mongoose.model('Users', usersSchema);
