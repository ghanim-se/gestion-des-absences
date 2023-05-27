import express from 'express'
import { dashboardCtrl } from '../controllers/admin/dashboardCtrl'
import { professorDashboardCtrl } from '../controllers/professor/dashboardCtrl'
import { adminAuth } from '../middlewares/adminAuth'
import { userAuth } from '../middlewares/userAuth'

const router = express.Router()

router.get('/dashboard', adminAuth, dashboardCtrl)
router.get('/professor/dashboard',userAuth, professorDashboardCtrl)

export { router as dashboardRouter }