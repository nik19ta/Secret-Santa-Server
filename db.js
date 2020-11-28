const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";

const randint = (min, max) => {
    return +(Math.random() * (max - min) + min).toFixed(0)
};

function cookie_generate(count) {
    let dictionary = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*';
    let cookie = "";

    for (let i = 0; i < count; i++) {
        cookie = cookie + dictionary[randint(0, dictionary.length)]
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
        console.log('========');
        console.log(data['users'][i].gmail);
        console.log(login);
        console.log(data['users'][i].password);
        console.log(password);
        console.log('========');


        if (login == data['users'][i].gmail && password == data['users'][i].password) {
            count = 1;
            break
        }
    }
    return count > 0
};
function git_info(login, password) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        if (login == data['users'][i].gmail && password == data['users'][i].password) {
            count = data['users'][i];
            break
        }
    }
    return count
};
function select_user_cookie(cookie) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let user = null;
    for (let i = 0; i < data['users'].length; i++) {
        if (cookie === data['users'][i].cookie) {
            user =  data['users'][i];
            break
        }
    }
    return user
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
function get_counts() {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    return data['users'].length
}
function get_counts_d() {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);

    let d_ = []
    let d_counts = 0;
    for (let i = 0; i < data['users'].length; i++) {
        console.log(data['users'][i].department);
        if (d_.indexOf(data['users'][i].department) === -1) {
            d_.push(data['users'][i].department)
            d_counts++
        }
        
    }

    return d_counts -1
}
function get_counts_b() {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);

    let d_ = []
    let b_counts = 0;
    for (let i = 0; i < data['users'].length; i++) {
        console.log(data['users'][i].branch);
        if (d_.indexOf(data['users'][i].branch) === -1) {
            d_.push(data['users'][i].branch)
            b_counts++
        }
        
    }

    return b_counts - 1
}



module.exports.new_user = new_user;
module.exports.select_user = select_user;
module.exports.getAllUsers = getAllUsers;
module.exports.edit_user = edit_user;
module.exports.cookie_generate = cookie_generate;
module.exports.select_user_cookie = select_user_cookie;
module.exports.get_counts = get_counts;
module.exports.get_counts_d = get_counts_d;
module.exports.get_counts_b = get_counts_b;
module.exports.git_info = git_info;