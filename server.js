const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json()

const db = require('./db')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/add', jsonParser, async function (req, res) { 
    try {
        let cookie = db.cookie_generate(12);
        let data = {
            aboutMe: req.body.about,
            Name: req.body.Name,
            wishList: req.body.wishlist,
            dontLike: req.body.blacklist,
            password: req.body.password,
            gmail: req.body.email,
            branch: req.body.branch,
            department: req.body.department,
            cookie: cookie
        }

        let result = db.new_user(data);
        if (result != true) {
            console.log('error new user');
            res.send('error')
        }
        res.send('ok');
    } catch (error) {
        res.send('error')
    }
})
app.post('/AllData', function (req, res) { 
    try {
        let result = db.getAllUsers(false);
        res.send({'success':result});
    } catch (error) {
        res.send('error')
    }
})
app.post('/count', function (req, res) { 
    try {
        let result = db.getAllUsers(true);
        res.send({'success':result});
    } catch (error) {
        res.send('error')
    }
})

app.listen(3650);