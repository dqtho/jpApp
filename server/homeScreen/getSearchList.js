const db = require("../db");

async function getSearchList(req) {
    console.log(req)

    let sql = `select * from product `
    req.danhMuc == `tatCa` ? sql += ` where danhMuc != ''` : sql += `where danhMuc = '${req.danhMuc}'`
    req.khuVuc != null ? sql += ` and khuVuc = '${req.khuVuc}'` : null
    req.mucGiaTu != null ? sql += ` and gia >= ${req.mucGiaTu}` : null
    req.mucGiaDen != null ? sql += ` and gia <= ${req.mucGiaDen}` : null
    req.sapXepTheo == `time` ? sql += `order by time` : null



    console.log(sql)


    let arr = await db(sql)
    console.log(arr)
}

module.exports = getSearchList