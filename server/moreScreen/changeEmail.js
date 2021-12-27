const db = require("../db");

async function changeEmail(req){
    let checkEmail = await db("select * from user where email = ?;", [req.email])
    if(checkEmail.length ==0){
        await db("update user set email = ?, password = ? where password = ? ;", [req.email, req.newPassword, req.password])
        return {isSuccess:true, newPassword: req.newPassword}
    }else{
        return{isSuccess:false, msg:"email da duoc dang ky"}
    }

}

module.exports = changeEmail