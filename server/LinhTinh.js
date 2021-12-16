let nodemailer = require("nodemailer")
class LinhTinh{
    static async sentMail(email, content) {
        const emailConfig = {
            service: 'gmail',
            auth: {
                user: 'tojapan98@gmail.com', // email hoặc username
                pass: 'Tatatatata98' // password
            }
        }
        var transporter = nodemailer.createTransport(emailConfig)
        var mail = {
            from: 'tojapan98@gmail.com', // Địa chỉ email của người gửi
            to: email, // Địa chỉ email của người gửi
            subject: 'Thư được gửi bằng Node.js', // Tiêu đề mail
            text: 'Toidicode.com', // Nội dung mail dạng text
            html: content // Nội dung mail dạng html
        }
        transporter.sendMail(mail, function (error, info) {
            if (error) { // nếu có lỗi
                console.log(error);
            } else { //nếu thành công
                console.log('Email sent: ' + info.response);
            }
        })
    }

    static createOTP(){
        return (Math.floor(Math.random() * 899999) + 100000)
    }

}

module.exports = LinhTinh