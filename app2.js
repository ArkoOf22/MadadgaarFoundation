////----------Adding Backend-----//

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to DB"));
db.once('open', () => console.log("Connected to database"));

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pno = req.body.phoneno;
    var msg = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "phone": pno,
        "message": msg
    }
    console.log(data);
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted Successfully!");
    })

    return res.redirect('index.html');
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('index.html');
});
app.listen(3000, () => {
    console.log("Listening on 3000!");
})