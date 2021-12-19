let LinhTinh = require("./LinhTinh")
let db = require("./db")
async function signIn(req) {
    let arr = await db("select * from user where password = ?", [req.password])
    console.log(arr.length)
    if (arr.length > 0) {

        console.log("sign in success")
        console.log(arr)
        return { isSuccess: true, email: arr[0].email, password: arr[0].password, id: arr[0].id, avata: arr[0].avata }
    } else {
        console.log("sign in false")
        return { isSuccess: false }
    }
}

module.exports = signIn