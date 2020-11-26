const fs = require('fs');

function select_user(name, name_) {
    name = name.toLowerCase()
    name_ = name.toLowerCase()
    let file = fs.readFileSync("./discharge.json", "utf8");
    let data = JSON.parse(file);
    let user = {
        'ФИО': null,
        'Фактический департамент':null,
        'Фактическое подразделение':null,
        'Позиция':null
    };

    for (let i = 0; i < data['users'].length; i++) {
        if (name_ == data['users'][i][name]) {
            user = data['users'][i];
            break
        }
    }
    return user
};


// console.log(select_user('E-mail','PAbakumov@croc.ru'));
module.exports.select_user = select_user;