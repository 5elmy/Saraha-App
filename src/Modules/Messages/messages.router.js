import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { AsyncHandler } from "../../utils/ErrorHandling.js";
import * as messageController from './controller/messages.controller.js'
import { deleteMessageValidation, sendmessagevalidation } from "./message.validation.js";

const router =Router();
router.get('/',auth,AsyncHandler(messageController.getMessages))
router.delete('/:id',auth , validation(deleteMessageValidation) , AsyncHandler(messageController.deleteMessage))
router.post('/:recieverId',validation(sendmessagevalidation),AsyncHandler(messageController.sendMessage))

export default router