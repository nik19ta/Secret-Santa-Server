const fs = require('fs');
const filename = "./db.json";

const encoding = "utf8";
const get_info_user = require('./croc_users');

let file = fs.readFileSync(filename, encoding);
let data = JSON.parse(file);
let user;


for (let i = 0; i < data['users'].length; i++) {
    user = get_info_user.select_user('', data['users'][i]['gmail'].toLowerCase());
    data['users'][i]['Name'] = user['ФИО'];
    data['users'][i]['Position'] = user['Позиция']
    data['users'][i]['department'] = user['Фактический департамент']
    data['users'][i]['branch'] =user['Фактическое подразделение']
    console.log(data['users'][i]);
}

fs.writeFileSync('damp___.json', JSON.stringify(data));