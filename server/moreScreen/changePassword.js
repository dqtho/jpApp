const db = require("../db");

async function changePassword(req) {
    console.log(req)
    try {

        let check = await db("select * from user where password = ? ;", [req.oldPassword])
        console.log(check)
        if (check.length == 1) {
            await db("update user set password = ? where password = ? ;", [req.newPassword, req.oldPassword])
            return { isSuccess: true, newPassword: req.newPassword }
        }else{
            return {isSuccess:false}
        }

    } catch (error) {
        console.log(error)
        return { isSuccess: false }
    }
}

module.exports = changePassword