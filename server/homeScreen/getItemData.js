const db = require("../db");

async function getItemData(req) {
    console.log(req)
    let data = await db("select * from product where id = ? ;", [req.id])
    let image = await db("select base64 from image where productId = ?", [data[0].id])
    let user = await db("select email, username, avata, facebook, phoneNumber from user where password = ?;", [data[0].password])
    // console.log(data)

    let listedItem = []
    let item = await db("select * from product where password = ? and id != ? limit ? ", [data[0].password, req.id, 10])

    await Promise.all(
        item.map(async val => {
            let image = await db("select * from image where productId = ? limit 1;", [val.id])
            val = {
                id: val.id,
                tieuDe: val.tieuDe,
                moTa: val.moTa,
                khuVuc: val.khuVuc,
                gia: val.gia,
                phiShip: val.phiShip,
                image: image[0].base64

            }
            listedItem.push(val)
        })
    )
    console.log(listedItem)
    return {
        tieuDe: data[0].tieuDe,
        password: data[0].password,
        moTa: data[0].moTa,
        danhMuc: data[0].danhMuc,
        khuVuc: data[0].khuVuc,
        gia: data[0].gia,
        phiShip: data[0].phiShip,
        image,
        email: user[0].email,
        username: user[0].username,
        avata: user[0].avata,
        facebook: user[0].facebook,
        phoneNumber: user[0].phoneNumber,

        listedItem: listedItem

    }
}
module.exports = getItemData