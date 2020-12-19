const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";

let file = fs.readFileSync(filename, encoding);
let data = JSON.parse(file);


for (let i = 0; i < data['users'].length; i++) {
    if (data['users'][i]['Name'] == null) {
        console.log(data['users'][i]['gmail']);
    }
}