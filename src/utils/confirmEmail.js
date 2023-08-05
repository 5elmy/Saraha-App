import nodemailer from 'nodemailer'

async function sendEmail({to=[], subject, text, html,attachments=[], cc,bcc}={}) {

  let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,       // true for 465, false for other ports
    auth: {
      user: process.env.CEMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Sayed Foo 👻 ${process.env.cEMAIL} " `, // sender address
    to   ,       //: `${process.env.EMAIL}` ,  // "bar@example.com, baz@example.com", // list of receivers
    cc,
    bcc,  //لو انت باعت لحد ومش عايز حد يعرفه
    subject , //: "Hello ✔", // Subject line //title
    text , //: "How are you and your family sayed Abo shakha", // plain text body
    html , //: "<b>sayed Abo shakha</b>", // html body //me see in body 
    attachments,
  });

  console.log(info);
  return info.rejected.length ? false : true ;
}

export default sendEmail

//main().catch(console.error);
