const e = require('express')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
const mongoose = require('mongoose')
const { Schema } = mongoose;


const connect=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/winticket', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
  }

  connect()




app.get('/ticket', async(req, res) => {
    try{
    const data = await Users.find()
  res.json({
      ticketList: data,
  })
}catch(err){
    console.log(err)
}
})




app.get('/tickets/:ticketno',(req, res)=> {
    console.log(req.params.ticketno)
})

app.post('/tickets',(req, res)=> {
  console.log(req)
})

app.get('/users',async (req, res)=> {
  const usersList = await Users.findOne({name: req.query.name})
  const searchWinColor = await Winner.findOne({ticketNo: req.query.ticketNo})
  if(searchWinColor?.color === req.query.color && usersList){
    res.json({
        msg: "hurray! wiiner winner chicken dinner"
    })
  }else{
      if(!usersList){
          res.json({
            errMsg: 'not registered'
          })
      }else{
          res.json({
              errMsg: 'you have lost'
          })
      }
  }

})

const usersSchema = new Schema({
    name: {type:String, unique: true},
    ticketNo: Number
  },
  { collection: 'users' });

const Users = mongoose.model('Users', usersSchema);



const winnerSchema = new Schema({
    color: {type:String},
    ticketNo: Number
  },
  { collection: 'winner' });

const Winner = mongoose.model('Winner', winnerSchema);


app.post('/winner',async(req, res)=> {
    try{
      const data = await Winner.create(req.body)
      if(data){
          res.json({
              msg: `ticket number ${req.body.ticketNo} and color ${req.body.color} has been set as winner`
          })
      }else{
        res.json({
            msg: "something went wrong"
        })
      }
    }catch(err){
        console.log(err)
    }
  
  })




app.post('/register',async(req, res)=> {
    try{
        const usersList = await Users.findOne({name: req.body.name})
        if(usersList){
            res.json({
                msg: 'User Name already exist'
            })
        }else{
    
        const data = await Users.create(req.body)
        if(data){
            res.json({
                msg: 'user registered'
            })
        }else{
            res.json({
                msg: 'registration failed'
            })
        }
        }

    }catch(err){
        console.log(err)
    }
  
  })
  
  app.put('/register',async(req, res)=> {
//req.bodyt

//task : save it in db not with await Users.create(req.body)
//we have to update await Users.findOneAndUpdate
  
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

