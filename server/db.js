var mysql = require('mysql');
var con = mysql.createConnection({
    database: 'jpShop',
    host: "localhost",
    user: "root",
    password: "00000000", 
    charset:'utf8mb4'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("database Connected!");
});
async function db(sql, arr) {
    let query = async (sql) => {
        return new Promise(function (resolve, reject) {
                con.query(sql, arr, (err, db) => {
                    if (err) throw err;
                    resolve(db)
                })
        });
    }
    return await query(sql)
}
module.exports = db