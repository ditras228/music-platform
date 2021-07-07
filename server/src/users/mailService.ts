const nodemailer = require("nodemailer");
export async function main(to: string, hash: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'druzhinindmitry2020@gmail.com',
            pass: process.env.EMAILPASSWORD,
        },
    });

    let link=`http://localhost:5000/regconfirm/${hash}`

    await transporter.sendMail({
        from: '"MERNMusic" <druzhinindmitry2020@gmail.com>',
        to: to,
        subject: "Подтверждение регистрации",
        text: "Спасибо за регистрацию на MERNMusic!",
        html: `<a href=${link}>Подтвердить</a>`,
    });
}