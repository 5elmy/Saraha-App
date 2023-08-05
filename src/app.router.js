import connectDB from "../DB/connection.js";
import authRouter from "./Modules/Auth/auth.router.js";
import messageRouter from "./Modules/Messages/messages.router.js";
import userRouter from "./Modules/Users/users.router.js";
import { globalhandling } from "./utils/ErrorHandling.js";

const initAPP = (app, express) => {
  app.use(express.json({}));

  app.get("/", (req, res) => res.send("Hello world!"));

  app.use("/auth", authRouter);
  app.use("/message", messageRouter);
  app.use("/user", userRouter);
  app.use(globalhandling)

  app.all("*", (req, res, next) => {
    return res.json({ message: "404 In-valid Routing" });
  });

  //DB connection
  connectDB();
};
export default initAPP;
