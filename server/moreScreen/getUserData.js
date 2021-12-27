let db = require("../db")
async function getUserData(req) {
    let val = await db("select * from user where password = ?", [req.password])
    return val[0]


}

module.exports = getUserData