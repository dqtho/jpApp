const { createOTP, sentMail } = require("../LinhTinh");
async function changeEmailGetOtp(req) {
    let otp = await createOTP()
    console.log(req.email + otp)
    sentMail(req.email, "<h1>" + otp + "</h1>")
    return { otp }

}

module.exports = changeEmailGetOtp