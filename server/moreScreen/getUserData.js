let db = require("../db")
async function getUserData(req) {
    let val = await db("select username, avata, point, facebook, address, phoneNumber, email from user where password = ?", [req.password])
    console.log(val)
    console.log(req)
    return val[0]


}

module.exports = getUserData