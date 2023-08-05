import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as userController from "./controller/users.controller.js";
import { updateUserValidation } from "./user.validation.js";

const router = Router();
router.get("/", userController.userModule);
router.patch("/",auth, validation(updateUserValidation) ,userController.updateUser);
router.delete("/",auth ,userController.deleteUser);

export default router;
