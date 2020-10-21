const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";


function cookie_generate(count) {
    let dictionary = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*';
    let cookie = "";

    for (let i = 0; i < count; i++) {
        cookie = cookie + cl[Math.random() * (dictionary.length - 0) + 0]
    }
    return cookie
}

function new_user(user) {
    fs.readFile(filename, encoding, function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        data['users'].push(user);
        fs.writeFileSync(filename, JSON.stringify(data));
    });
    return true
}

function select_user(login, password) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        if (login === data['users'][i].login && password === data['users'][i].password) {
            count = 1;
            break
        }
    }
    return count > 0
};

function edit_user(login, password, key, value) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        if (login === data['users'][i].login && password === data['users'][i].password) {
            data['users'][i][key] = value;
        }
    }
    console.log(data);
    fs.writeFileSync(filename, JSON.stringify(data));
    return count > 0
}

function getAllUsers(count) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    if (count != false) {
        return data['users'].length
    } else {
        return data['users']
    }
}

module.exports.new_user = new_user;
module.exports.select_user = select_user;
module.exports.getAllUsers = getAllUsers;
module.exports.edit_user = edit_user;
module.exports.cookie_generate = cookie_generate;