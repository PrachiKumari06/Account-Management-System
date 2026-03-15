import express from "express"
import verifyAuth from "../middleware/auth.middleware.js"
import {getbalance,transferMoney,getStatement} from "../controller/account.controller.js"

const router = express.Router()

router.get("/balance",verifyAuth,getbalance)
router.post("/transfer",verifyAuth,transferMoney)
router.get("/statement",verifyAuth,getStatement)

export default router