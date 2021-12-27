let LinhTinh = require("../LinhTinh")
let db = require("../db")
async function getOTP(req) {
    let checkEmail = await db("select email from user where email = ?", [req.email])
    console.log(checkEmail.length)
    if (checkEmail.length > 0) {
        return { type: "getOtp", isSuccess: false }
    } else {
        let otp = await LinhTinh.createOTP()
        console.log(req.email + otp)
        LinhTinh.sentMail(req.email, "<h1>" + otp + "</h1>")
        return { isSuccess: true, email: req.email, password: req.password, otp }
    }
}

module.exports = getOTP