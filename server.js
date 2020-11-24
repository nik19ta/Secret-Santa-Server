const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json()
const cookieParser = require('cookie-parser');

const get_info_user = require('./croc_users');

const db = require('./db')

const port = 3650;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.post('/add', jsonParser, async function (req, res) {
    console.log(req.body);
    try {
        let cookie = db.cookie_generate(12);
        console.log(req.body);

        let info = get_info_user.select_user('E-mail',req.body.email);
        
        let data = {
            aboutMe: req.body.about,
            Name: info['ФИО'],
            password: req.body.password,
            gmail: req.body.email,
            department: info['Фактический департамент'],
            branch: info['Фактическое подразделение'],
            deliveryDate: req.body.deliveryDate,
            adress: req.body.adress,
            isAdmin: false,
            cookie: cookie
        }

        let result = db.new_user(data);
        if (result != true) {
            res.send({
                'status': 'error'
            })
        }
        res.cookie("user", cookie);
        res.send({
            'status': 'ok',
            'data': data
        });
    } catch (error) {
        res.send('error')
    }
})

app.post('/login', jsonParser, async function (req, res) {
    console.log(req.body);

    let data = db.select_user(req.body.email, req.body.password)
    res.send({"data":data})
    // try {
    //     let data = {
    //         aboutMe: req.body.about,
    //         Name: req.body.Name,
    //         wishList: req.body.wishlist,
    //         dontLike: req.body.blacklist,
    //         password: req.body.password,
    //         gmail: req.body.email,
    //         branch: req.body.branch,
    //         department: req.body.department,
    //         cookie: cookie
    //     }

    //     let result = db.new_user(data);
    //     if (result != true) {
    //         res.send({
    //             'status': 'error'
    //         })
    //     }
    //     res.cookie("user", cookie);
    //     res.send({
    //         'status': 'ok',
    //         'data': data
    //     });
    // } catch (error) {
    //     res.send('error')
    // }
})

app.get('/getcookies', (req, res)=>{ 
    res.send(req.cookies);
}); 
app.get('/count', (req, res)=>{ 
    let count = db.get_counts()
    res.send({"counts":count});
});






app.post('/auto_login', (req, res) => {
    console.log(req.cookies);
    let user = db.select_user_cookie(req.cookies);
    console.log(user);
    if (user != null) res.send({'data':user})
    else res.send({'data':'error'})
    
});


app.post('/AllData', function (req, res) {
    try {
        let result = db.getAllUsers(false);
        res.send({
            'success': result
        });
    } catch (error) {
        res.send('error')
    }
})
app.post('/count', function (req, res) {
    try {
        let result = db.getAllUsers(true);
        res.send({
            'success': result
        });
    } catch (error) {
        res.send('error')
    }
})

app.listen(port, () => {
    console.log(`server start on port ${port}`);
});