const db = require("../db");

async function getItemData(req){
    console.log(req)
    let data = await db("select * from product where id = ? ;",[req.id])
    let image = await db("select base64 from image where productId = ?", [data[0].id])
    let email = await db("select email from user where password = ?;", [data[0].password])
    console.log(data)
    console.log(email)
    return {
        tieuDe:data[0].tieuDe,
        moTa:data[0].moTa,
        danhMuc:data[0].danhMuc,
        khuVuc:data[0].khuVuc,
        gia:data[0].gia,
        phiShip:data[0].phiShip,
        email:email[0].email,
        image

    }
}
module.exports = getItemData