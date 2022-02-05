let db = require("../db")
async function getListedItemOfUser(req) {



    let data = []
    let item = await db("select * from product where password = ? limit ? ", [req.password, req.limit])

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
            data.push(val)
        })
    )
    return data
}

module.exports = getListedItemOfUser