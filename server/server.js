let app = require("express")
let http = require("http").Server(app)
let io = require("socket.io")(http)
let port = process.env.port || 3000

let LinhTinh = require("./LinhTinh")
let signUp = require("./signUp")
let signIn = require("./signIn")
let postProduct = require("./postProduct")

io.on("connection", socket => {
    console.log(socket.id)


    socket.on("signUp", async req => {
        console.log(req)
        let a = await signUp(req)
        socket.emit("signUpResponse", a)
    })

    socket.on("signIn", async req=>{
        let a = await signIn(req)
        socket.emit("signInResponse", a)
    })

    socket.on("postProduct", async req=>{
        let a = await postProduct(req)
        console.log(req)
        socket.emit("postProductResponse", a)
    })

})

http.listen(port, () => {
    console.log("started")
})