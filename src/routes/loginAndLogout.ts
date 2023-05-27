import express from 'express'
import { loginPageCtrl, logoutButtonCtrl } from '../controllers/loginAndLogoutCtrl'

const router = express.Router()

router.get('/', loginPageCtrl)
.post('/', loginPageCtrl)

router.get('/logout', logoutButtonCtrl)

export { router as loginRouter }