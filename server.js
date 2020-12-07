const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json()
const cookieParser = require('cookie-parser');

const get_info_user = require('./croc_users');
const path = require('path');

const db = require('./db')

const algoritm = require('./algoritm')

const csvWriter = require('csv-write-stream');
const csv = require('csv-parser');
const fs = require("fs");



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

    if (Object.keys(db.select_user_email(req.body.email)).length != 0) {
        res.send({'status': 'Такой пользователь уже существует'})
    } else {
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
                Position: info['Позиция'],
                branch: info['Фактическое подразделение'],
                deliveryDate: req.body.deliveryDate,
                adress: req.body.adress,
                phone: req.body.phone,
                isAdmin: false,
                cookie: cookie,
                whiteList: req.body.wishlist,
                blackList: req.body.blacklist,
                isPart: false,
                img: randint(1, 6),
                status: 0
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
    }

})
app.post('/gift_is_ready', jsonParser, async function (req, res) {
    console.log(req.body);
    console.log(req.body);

    let data = {
        name_gift: req.body.name_gift,
        wish: req.body.wish,
        email: req.body.email
    }

    db.new_gift(data);
    console.log('statusT');
    db.edit_user_em(req.body.email, 'statusT', true);

    res.send({
        'status': 'ok',
    });
})
app.post('/status_edit', jsonParser, async function (req, res) {
    console.log(req.body.count);
    console.log(req.body.email);
    db.edit_user_em(req.body.email, 'status', req.body.count);
    res.send({
        'status': 'ok',
    });
})
app.post('/ok_gm', jsonParser, async function (req, res) {
    db.edit_user_em(req.body.email, 'status', 2);
    db.edit_user_em(req.body.email, 'statusT', false);
    res.send({
        'status': 'ok',
    });
})

app.post('/login', jsonParser, async function (req, res) {
    console.log(req.body);
    let info = null;
    let data = db.select_user(req.body.email, req.body.password)
    if (data) {
        info = db.git_info(req.body.email, req.body.password)
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

app.get('/get_user_email', jsonParser, async function (req, res) {
    let data = db.select_user_email(req.query.p)
    res.send({
        "data": data
    })
})
app.get('/get_user_giver', jsonParser, async function (req, res) {
    let data = db.select_giver(req.query.p)
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

app.get('/get_users_in_csv', function (req, res) {
    obj = db.select_user_cookie(req.cookies['user']);
    let objs = db.getAllUsers(false)


    writer = csvWriter({
        headers: [
            "aboutMe", "phone", "password", "gmail", "Name",
            "department", "Position", "branch", "gmail", "deliveryDate",
            "adress", "isAdmin", "img", "isPart", "status",
        ]
    });


    writer.pipe(fs.createWriteStream('./data.csv', {
        flags: 'a'
    }));

    console.log(objs);

    for (let i = 0; i < objs.length; i++) {
        writer.write({
            aboutMe: objs[i].aboutMe == null ? 'null' : objs[i].aboutMe,
            phone: objs[i].phone == null ? 'null' : objs[i].phone,
            password: objs[i].password == null ? 'null' : objs[i].password,
            gmail: objs[i].gmail == null ? 'null' : objs[i].gmail,
            Name: objs[i].Name == null ? 'null' : objs[i].Name,
            department: objs[i].department == null ? 'null' : objs[i].department,
            Position: objs[i].Position == null ? 'null' : objs[i].Position,
            branch: objs[i].branch == null ? 'null' : objs[i].branch,
            deliveryDate: objs[i].deliveryDate == null ? 'null' : objs[i].deliveryDate,
            adress: objs[i].adress == null ? 'null' : objs[i].adress,
            isAdmin: objs[i].isAdmin == null ? 'null' : objs[i].isAdmin,
            img: objs[i].img == null ? 'null' : objs[i].img,
            isPart: objs[i].isPart == null ? 'null' : objs[i].isPart,
            status: objs[i].status == null ? 'null' : objs[i].status
        });

    }
    writer.end(() => {
        setTimeout(() => {
            res.sendFile(path.resolve('./data.csv'));
            setTimeout(() => {
                fs.unlink('./data.csv', function (err) {
                    if (err) return console.log(err);
                });
            }, 6000);
        }, 1000)
    })
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


app.post('/algoritm', function (req, res) {
    try {
        algoritm.algoritm();
        res.send({
            'status': 'ok'
        });
    } catch (error) {
        res.send({
            'status': 'error'
        });
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
        res.send({
            'status': 'error'
        })
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
app.post('/get_discount', jsonParser, function (req, res) {
    try {
        let user = db.select_user_email(req.body.email)

        if (user.isCode.length == undefined) {
            let result = db.get_codes(req.body.email);
            db.edit_user_em(req.body.email, "isCode", result.code);
            console.log(result);
            res.send({
                'status': true,
                'code': result.code,
                'discount': result.discount
            });
        } else {
            res.send({
                'status': user.isCode
            });
        }
    } catch (error) {
        res.send({
            'status': false
        });
    }
})

app.listen(port, () => {
    console.log(`server start on port ${port}`);
});