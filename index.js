import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import initAPP from "./src/app.router.js";
import sendEmail from "./src/utils/confirmEmail.js";

const app = express();
const port = process.env.PORT;

initAPP(app, express);
// sendEmail({
//   cc:process.env.CEMAIL,
//   text:"How are you and your family sayed Abo shakha"
//   ,html:"<h3>3/7/2023 zamalek & tragiii yarb naksb </h3>",
// subject:"Dolla123",
// attachments:[
//   {   // use URL as an attachment
//     filename: 'validation.txt',
//     path: './validation.txt',
//   contentType: 'text/plain'
// }

// ]})
app.listen(port, () => {
  console.log(`Server is running on port.......${port}`);
});
