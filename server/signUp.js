let LinhTinh = require("./LinhTinh")
let db = require("./db")
async function signUp(req) {
    switch (req.type) {
        case "getOTP":
            let checkEmail = await db("select email from user where email = ?", [req.email])
            console.log(checkEmail.length)
            if (checkEmail.length > 0) {
                return { type: "getOtp", isSuccess: false }
            } else {
                let otp = await LinhTinh.createOTP()
                console.log(req.email + otp)
                LinhTinh.sentMail(req.email, "<h1>" + otp + "</h1>")
                return { type: "getOtp", isSuccess:true, email: req.email, password: req.password, otp }
            }

        case "final":
            let username = req.email.split("@")[0]
            db("insert into user (username, email, password) values (?, ?, ? );", [username, req.email, req.password])
            return { type: "final", msg: "dang ky thanh cong" }
        default:
            break;
    }
}

module.exports = signUp