const { promises } = require("nodemailer/lib/xoauth2");
const db = require("../db");

async function getNewItem(req) {
    let data = []
    let newItem = await db("select id, tieuDe, moTa, khuVuc, gia, phiShip from product")

    await Promise.all(
        newItem.map(async val => {
            let image = await db("select * from image where productId = ? limit 1;", [val.id])
            val = {
                id: val.id,
                tieuDe: val.tieuDe,
                moTa:val.moTa,
                khuVuc: val.khuVuc,
                gia: val.gia,
                phiShip: val.phiShip,
                image: image[0].base64

            }
            data.push(val)
        })
    )


    console.log(data)
    return data
}

module.exports = getNewItem