const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";

const randint = (min, max) => {
    return +(Math.random() * (max - min) + min).toFixed(0)
};

const randchoice = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
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
function new_gift(user) {
    fs.readFile(filename, encoding, function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        data['gifts'].push(user);
        fs.writeFileSync(filename, JSON.stringify(data));
    });
    return true
}

function select_user(login, password) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {


        if (login == data['users'][i].gmail && password == data['users'][i].password) {
            count = 1;
            break
        }
    }
    return count > 0
};
function select_user_email(email) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let user = {};
    for (let i = 0; i < data['users'].length; i++) {
        if (email.toLowerCase() == data['users'][i].gmail.toLowerCase()) {
            user.aboutMe = data['users'][i].aboutMe
            user.phone = data['users'][i].phone
            user.gmail = data['users'][i].gmail
            user.Name = data['users'][i].Name
            user.department = data['users'][i].department
            user.Position = data['users'][i].Position
            user.branch = data['users'][i].branch
            user.adress = data['users'][i].adress
            user.img = data['users'][i].img
            user.whiteList = data['users'][i].whiteList
            user.blackList = data['users'][i].blackList
            user.deliveryDate = data['users'][i].deliveryDate
            user.status = data['users'][i].status
            user.isCode = data['users'][i].isCode
            break
        }
    }

    return user
};
function select_giver(email) {
    //console.log(email);
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let user = {};
    for (let i = 0; i < data['users'].length; i++) {
        if (data['users'][i].isPart) {
            if (email.toLowerCase() == data['users'][i].isPart.toLowerCase()) {
                user.aboutMe = data['users'][i].aboutMe
                user.phone = data['users'][i].phone
                user.gmail = data['users'][i].gmail
                user.Name = data['users'][i].Name
                user.department = data['users'][i].department
                user.Position = data['users'][i].Position
                user.branch = data['users'][i].branch
                user.adress = data['users'][i].adress
                user.img = data['users'][i].img
                user.whiteList = data['users'][i].whiteList
                user.blackList = data['users'][i].blackList
                user.deliveryDate = data['users'][i].deliveryDate
                user.status = data['users'][i].status
                break
            }
        }
    }

    return user
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
    fs.writeFileSync(filename, JSON.stringify(data));
    return count > 0
}
function edit_user_em(email, key, value) {
    console.log(1);
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        console.log('===');
        console.log(data['users'][i].gmail);
        console.log(email);
        console.log('===');
        if (email === data['users'][i].gmail) {
            data['users'][i][key] = value;
        }
    }
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
        if (d_.indexOf(data['users'][i].branch) === -1) {
            d_.push(data['users'][i].branch)
            b_counts++
        }
        
    }

    return b_counts - 1
}

function get_codes(email) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let array = [];
    for (let i = 0; i < data['codes'].length; i++) {if (!data['codes'][i].is) {array.push(data['codes'][i])}}
    let num = randint(0, array.length )
    data['codes'][num]['is'] = email;
    fs.writeFileSync(filename, JSON.stringify(data));
    return array[num]
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
module.exports.select_user_email = select_user_email;
module.exports.select_giver = select_giver;
module.exports.edit_user_em = edit_user_em;
module.exports.new_gift = new_gift;
module.exports.get_codes = get_codes;