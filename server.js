const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json()
const cookieParser = require('cookie-parser');

const get_info_user = require('./croc_users');
const path = require('path');

const db = require('./db')


const port = 3650;

const randint = (min, max) => {
    return +(Math.random() * (max - min) + min).toFixed(0)
};


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

        let info = get_info_user.select_user('E-mail', req.body.email);

        let data = {
            aboutMe: req.body.about,
            password: req.body.password,
            gmail: req.body.email,
            Name: info['ФИО'],
            department: info['Фактический департамент'],
            department: info['Фактический департамент'],
            Position: info['Позиция'],
            branch: info['Фактическое подразделение'],
            deliveryDate: req.body.deliveryDate,
            adress: req.body.adress,
            phone: req.body.phone,
            isAdmin: false,
            cookie: cookie,
            img: randint(1, 6)
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
    if (data) {
        let info = db.git_info(req.body.email, req.body.password)
    }
    res.send({
        "data": data,
        "info": info
    })
})
app.get('/all_users', jsonParser, async function (req, res) {
    console.log(req.body);

    let data = db.getAllUsers(false)
    res.send({
        "data": data
    })
})

app.get('/getcookies', (req, res) => {
    res.send(req.cookies);
});
app.get('/count', (req, res) => {
    let count = db.get_counts()
    let count_d = db.get_counts_d()
    let count_b = db.get_counts_b()

    res.send({
        "counts": count,
        "deportaments": count_d,
        "branches": count_b
    });
});






app.post('/auto_login', (req, res) => {
    console.log(req.cookies);
    let user = db.select_user_cookie(req.cookies);
    console.log(user);
    if (user != null) res.send({
        'data': user
    })
    else res.send({
        'data': 'error'
    })

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
app.get('/get_count_users', function (req, res) {
    try {
        let result = db.getAllUsers(false);

        let data = [];

        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);

            if (result[i]['Name'] != null && data.length < 6) {
                data.push({
                    name: result[i]['Name'],
                    Position: result[i]['Position'],
                    img: result[i]['img']
                })
            }
        }
        // for (let i = 0; i < array.length; i++) {
        //     const element = array[i];
            
        // }
        res.send({
            'success': data
        });
    } catch (error) {
        res.send({'status': 'error'})
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