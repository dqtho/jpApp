let LinhTinh = require("../LinhTinh")
let db = require("../db")
async function signIn(req) {
    let arr = await db("select * from user where password = ?", [req.password])
    console.log(arr.length)
    if (arr.length > 0) {

        console.log("sign in success")
        console.log(arr)
        return {
            isSuccess: true,
            id: arr[0].id,
            username: arr[0].username,
            password: arr[0].password,
            avata:arr[0].avata, 
            facebook:arr[0].facebook, 
            address: arr[0].address,
            phoneNumber: arr[0].phoneNumber,
            email: arr[0].email,
            avata: arr[0].avata,
            point:arr[0].point,
            credit:arr[0].credit,
        }
    } else {
        console.log("sign in false")
        return { isSuccess: false }
    }
}

module.exports = signIn