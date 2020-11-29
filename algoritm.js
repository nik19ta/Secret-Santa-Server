const fs = require('fs');
const db = require('./db')
const filename = "./db.json";
const encoding = "utf8";
function algoritm() {
    let result = db.getAllUsers(false);
    while (getList(result) > 2) {
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result.length; j++) {
                    if (result[j].department != result[i].department) {  
                        if (check(result[j].gmail, result) < 1) {
                            if (result[i].isPart == false) {
                                if (result[j].isPart != result[i].gmail) {
                                    result[i].isPart = result[j].gmail;
                                    console.log(`Пара: даритель ${result[i].gmail} и получательно ${result[j].gmail}`);            
                                }
                            }
                        }
                    }
            }
        }
    }
}
function check(email, data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (email == data[i].isPart) {
            if (data[i].isPart) {
                count++
            }
        }
    }
    return count
};
function getList(data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (!data[i].isPart) {
            count++
        }
    }
    return count
}

algoritm()

module.exports.algoritm = algoritm;