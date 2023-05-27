import express from 'express'
import { manaulPage } from '../controllers/professor/manualCtrl'
import { userAuth } from '../middlewares/userAuth'

const router = express.Router()


router.get('/professor/manual', userAuth, manaulPage)
.post('/professor/manual', userAuth, manaulPage)


export { router as manualRouter }