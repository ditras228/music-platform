const nodemailer = require("nodemailer");
export async function main(to: string, hash: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.beget.com",
        port: 2525,
        secure: false,
        auth: {
            user: 'druzhinindmitry@druzhinindmitry.ru',
            pass: process.env.EMAILPASSWORD
        },
    });

    let link=`http://87.236.22.121:5002/auth/regconfirm/${hash}`

    await transporter.sendMail({
        from: '"MERNMusic" <druzhinindmitry@druzhinindmitry.ru>',
        to: to,
        subject: "Подтверждение регистрации",
        text: "Спасибо за регистрацию на MERNMusic!",
        html: `<a href=${link}>Подтвердить</a>`,
    });
}