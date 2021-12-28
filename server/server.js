let express = require("express")
let app = express()
let http = require("http").Server(app)
let io = require("socket.io")(http)
let port = process.env.port || 3000

app.use(express.json({ limit: '50mb' }))

// let LinhTinh = require("./LinhTinh")
let signUp = require("./moreScreen/signUp")
let signIn = require("./moreScreen/signIn")
let postProduct = require("./postProduct")
let getUserData = require("./moreScreen/getUserData")
const getOTP = require("./moreScreen/getOTP")
const changeEmailGetOtp = require("./moreScreen/changeEmailGetOtp")
const changeEmail = require("./moreScreen/changeEmail")
const changePassword = require("./moreScreen/changePassword")
const changeAccountData = require("./moreScreen/changeAccountData")


io.on("connection", socket => {
    console.log(socket.id)

    socket.on("signUpGetOtp", async req => socket.emit("signUpGetOtpResponse", await getOTP(req)))

    socket.on("signUp", async req => socket.emit("signUpResponse", await signUp(req)))

    socket.on("signIn", async req => socket.emit("signInResponse", await signIn(req)))

    socket.on("postProduct", async req => socket.emit("postProductResponse", await postProduct(req)))

    socket.on("getUserData", async req => socket.emit("getUserDataResponse", await getUserData(req)))

    socket.on("changeEmailGetOtp", async req => socket.emit("changeEmailGetOtpResponse", await changeEmailGetOtp(req)))

    socket.on("changeEmail", async req => socket.emit("changeEmailResponse", await changeEmail(req)))

    socket.on("changePassword", async req => socket.emit("changePasswordResponse", await changePassword(req)))

    socket.on("changeAccountData", async req => socket.emit("changeAccountDataResponse", await changeAccountData(req)))

})

http.listen(port, () => {
    console.log("started")
})