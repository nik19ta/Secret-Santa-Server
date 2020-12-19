const nodemailer = require("nodemailer");
const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";

let file = fs.readFileSync(filename, encoding);
let data = JSON.parse(file);

const login = 'crocsanta@gmail.com';
const password = 'qwerty890!0';

let gmail = []

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: login,
        pass: password,
    },
});


let users = [
    "SMarukhlenko@croc.ru",
    "nzharnikova@croc.ru",
    "OTavostina@croc.ru",
    "rnurkaeva@croc.ru",
    "KRakhimova@croc.ru",
    "MOvchinnikovaLazareva@croc.ru",
    "KKamenyuk@croc.ru",
    "Sgorshkova@croc.ru",
    "dpanteleev@croc.ru",
    "Amushinskaya@croc.ru",
    "IPitaykina@croc.ru",
    "oryabova@croc.ru",
    "VLeskova@croc.ru",
    "NSheyanov@croc.ru",
    "NUstinova@croc.ru",
    "EvKharitonova@croc.ru",
    "salekseev@croc.ru",
    "sebarabashin@croc.ru",
    "MLubyan@croc.ru",
    "2995@croc.ru",
    "iostankov@croc.ru",
    "ouskova@croc.ru",
    "anachenkina@croc.ru",
    "lmusarev@croc.ru",
    "DSemina@croc.ru",
    "angavrilova@croc.ru",
    "KDegtyareva@croc.ru",
    "mlob@croc.ru",
    "ykilina@croc.ru",
    "Epopkova@croc.ru",
    "Evarakina@croc.ru",
    "yvodenko@croc.ru",
    "AlVasiltsova@croc.ru",
    "dslesareva@croc.ru",
    "NKholopova@croc.ru",
    "ankuznetsova@croc.ru",
    "lkorneva@croc.ru",
    "ekaydashova@croc.ru",
    "mbedritskaya@croc.ru",
    "miromanov@croc.ru",
    "2060@croc.ru",
    "skorzhov@croc.ru",
    "alakimova@croc.ru",
    "eborodina@croc.ru",
    "SGorozhankina@croc.ru",
    "tmedvedeva@croc.ru",
    "VBiryukov@croc.ru",
    "ashmakova@croc.ru",
    "OVoloshchenko@croc.ru",
    "ETaborskaya@croc.ru",
    "LTrunina@croc.ru",
    "AKornilovich@croc.ru",
    "mmukhin@croc.ru",
    "mborovik@croc.ru",
    "navolkova@croc.ru",
    "DKadriya@croc.ru"
]

let step = 0;
setInterval(() => {
    if (step < users.length) {
        transporter.sendMail({
            from: login,
            to: users[step],
            subject: "Тайный Санта",
            text: "Привет! \nТы регистрировался на Тайного Санту, но пока что не отправил подарок. \nПожалуйста, не забудь сделать это до пн (21 декабря) включительно или напиши о том, что сможешь отправить подарок позже. \nПо всем вопросам пиши на eskvortsova@croc.ru.",
        });
        console.log(users[step] + ' Получил сообщение');
        step++
    }
}, 5000);
