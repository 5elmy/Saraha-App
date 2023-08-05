import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then((result) => console.log(`DB Saraha App connected successfully....`))
    .catch((error) => console.log(`Fail to connect on DB...`, error));
};
export default connectDB;
