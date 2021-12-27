let LinhTinh = require("../LinhTinh")
let db = require("../db")
async function signUp(req) {
    let username = req.email.split("@")[0]
    db("insert into user (username, email, password) values (?, ?, ? );", [username, req.email, req.password])
    return { type: "final", msg: "dang ky thanh cong", password: req.password }
}

module.exports = signUp