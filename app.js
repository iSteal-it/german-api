const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/germanAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const a1Schema = new mongoose.Schema({
  germanWord:{
    type:String,
    required:true
  },
  plural:{
    type:String
  },
  englishWord:{
    type:String,
    required:true
  }
})

const A1 = mongoose.model("A1",a1Schema)

app.route("/a1")

.get(function(req,res){
  A1.find(function(err,result){
    if(err) {
      res.send(err)
    } else {
      var words = result.length
      var rnd = Math.floor(Math.random() * words)
      res.send(result[rnd])
    }
  })
})

.post(function(req,res){
  const newA1 = new A1({
    germanWord:req.body.germanWord,
    plural:req.body.plural,
    englishWord:req.body.englishWord
  })
  newA1.save(function(err){
    if (err){
      res.send(err)
    } else {
      res.send("sucessfully saved")
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
