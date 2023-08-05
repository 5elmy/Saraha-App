import { Router }from "express"
import { validation } from "../../middleware/validation.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import * as authController from "./controller/auth.controller.js"
const router=Router();

router.get('/',authController.authModule)
router.post('/signup',validation(signupSchema) ,authController.signUp)
router.get('/confirmemail/:token',authController.confirmEmail)
router.get('/newconfirmemail/:token',authController.newConfirmEmail)
router.post('/login',validation(loginSchema),authController.logIn)

export default router