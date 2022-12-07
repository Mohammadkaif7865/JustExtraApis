import fetch from "node-fetch";
import express from 'express';
let app = express()
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
let port = process.env.PORT || 9870;
import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;
const url = 'https://jsonplaceholder.typicode.com/users';

//middleware (supporting lib)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
// 1.D
app.get('/', (req, res) => {
    res.send('Express Server default');
});
app.get('/users', (req, res) => {

    fetch(url, {
        method: 'GET',
    }).then((response) => response.json()).then((json) =>res.send(json));
});
app.get("/getStudents", (req, res) => {
    db.collection("School").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.post('/addStudent', (req, res) => {
    db.collection('School').insertOne(req.body, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete('/deleteStudent/:id', (req, res) => {
    db.collection('School').remove({ schoolCode: req.params.id }, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.put('/changeFeestatus/:id', (req, res) => {
    db.collection('School').updateOne({ schoolCode: req.params.id }, {
        $set: {
            "feesPaid": req.body.feestatus
        }
    }, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//Connection with db
// ! JustExtraApiDataBase  School
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error While Connecting`);
    db = client.db('JustExtraApiDataBase');
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Express Server listening on port ${port}`)
    });
});


/*
app.get('/restaurants/:id',(req,res) => {
  let id = req.params.id;
  let state = req.query.state
  let country  = req.query.country
  console.log(`>>>>>state>>>`,state)
  console.log(`>>>>>country>>>`,country)
  res.send(id)

  // db.collection('restaurants').find().toArray((err,result) => {
  //   if(err) throw err;
  //   res.send(result)
  // })
})
*/