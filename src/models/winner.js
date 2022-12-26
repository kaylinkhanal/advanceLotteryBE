const mongoose = require('mongoose')
const { Schema } = mongoose;
const winnerSchema = new Schema({
    color: {type:String},
    ticketNo: Number
  },
  { collection: 'winner' });

module.exports= mongoose.model('Winner', winnerSchema);
