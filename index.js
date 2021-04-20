const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://doctors-data:doctors-data@cluster0.ostva.mongodb.net/Appointments?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Appointments").collection("patientInfo");


  app.post("/addProduct", (req, res) => {
    const product = req.body;
    collection.insertOne(product)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  // app.get('/appointments',(req,res) =>{
  //   collection.find({})
  //   .toArray((err, document)=>{
  //     res.send(document)
  //   })
  // })

  app.post('/appointmentsByDate', (req, res) => {
    const date = req.body;
    console.log(date.date)
    collection.find({ date: date })
      .toArray((err, document) => {
        console.log(document)
        res.send(document)
      })
  })


});



app.listen(4001, console.log("hello express"))