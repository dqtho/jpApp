const db = require("../db");


async function changeAccountData(req) {
    console.log(req.password)
    try {
        await db("update user set avata = ?, username = ?, facebook = ?, phoneNumber = ?, address = ? where password = ?;", [req.avata, req.username, req.facebook, req.phoneNumber, req.address, req.password])
        return { isSuccess: true }
    } catch (error) {
        console.log(error)
        return ({ isSuccess: false })
    }

    return req
}

module.exports = changeAccountData