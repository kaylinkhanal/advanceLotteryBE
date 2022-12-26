const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/winticket', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }


