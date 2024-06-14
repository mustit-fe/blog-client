import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_APP_KEY,
  },
})

export const sendEmail = async (email: string) => {
  try {
    // 6자리 랜덤 숫자
    const randomNumber = Math.floor(Math.random() * 1000000)
    console.log(randomNumber)

    // 이메일 전송
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: '머스트잇 테크 블로그 - 이메일 인증',
      html: `<div><p>머스트잇 테크 블로그 회원가입을 위해 아래 인증번호를 회원가입 창에 입력해주세요.</p> <div style="font-weight: bold;font-size: 22px;">인증번호: ${randomNumber}</div></div>`,
    })

    return { isSuccess: true }
  } catch (error) {
    console.error(error)
    return { isSuccess: false }
  }
}