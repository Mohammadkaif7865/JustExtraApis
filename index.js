let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
//let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;

//middleware (supporting lib)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
// 1.D
app.get('/', (req, res) => {
    res.send('Express Server default')
});

//Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error While Connecting`);
    db = client.db('restaurantdata');
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