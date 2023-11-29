const asyncHandler=require('express-async-handler')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')


const sendEmail = asyncHandler(async(req, res) => {
    const { name, email, phone, description } = req.body
    const MY_GMAIL = process.env.MY_GMAIL
    const MY_PASSWORD = process.env.MY_PASSWORD

    const transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: MY_GMAIL,
        pass: MY_PASSWORD,
      },
    }))
  
    const mailOptions = {
      from: email,
      to: MY_GMAIL,
      subject: 'New Inquiry',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDescription: ${description}`,
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Email not sent' })
      }
      res.status(200).json({ message: 'Email sent successfully' })
    })
  })

  module.exports={ sendEmail }