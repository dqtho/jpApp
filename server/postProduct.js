let db = require("./db")

async function postProduct(req){
    let a = await db("insert into product (password, tieuDe, moTa, danhMuc, khuVuc, gia, phiShip, time) values (?, ?, ?, ?, ?, ?, ?, ? );", [req.password, req.tieuDe, req.moTa, req.danhMuc, req.khuVuc, req.gia, req.phiShip, new Date().getTime()])
    req.image.map( val=>{
        db("insert into image ( base64, productID) values ( ?, ?); ", [val, a.insertId])

    })
    return {isSuccess:true}
}
module.exports = postProduct