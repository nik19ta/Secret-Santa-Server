const db = require('./db')

function algoritm() {
    let result = db.getAllUsers(false);
    console.log(result);
}

algoritm()