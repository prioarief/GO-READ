require("dotenv").config()
const nodemailer = require("nodemailer")

module.exports = {
    emailVerify : (user_email, pass_email, email) => {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user: user_email,
                pass: pass_email
            }
        })
        
        const mailOptions = {
            from: 'prioariefgunawangunawan@gmail.com',
            to : email,
            subject: 'Email Confirmation',
            text: `tes confirmation
                    <a href="${email}">Click</a>
                    `
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error)
            }else{
                console.log(`Email Confirmation has been sent to ${info.accepted[0]}`)
            }
        })
    }
}