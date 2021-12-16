let LinhTinh = require("./LinhTinh")
let db = require("./db")
async function signIn(req){
    let arr = await db("select * from user where password = ?", [req.password])
    console.log(arr.length)
    if(arr.length >0){

        console.log("sign in success")
        return {isSuccess:true}
    }else{
        console.log("sign in false")
        return {isSuccess:false}
    }
}

module.exports = signIn