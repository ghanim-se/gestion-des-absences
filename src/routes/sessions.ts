import express from 'express'
import { getabsenceListsCtrl } from '../controllers/admin/absenceCtrl'
import { deleteSessionCtrl, getSessionsListCtrl } from '../controllers/professor/sessionsListCtrl'
import { getAbsencesListCtrl } from '../controllers/professor/absencesListCtrl'
import { adminAuth } from '../middlewares/adminAuth'
import { userAuth } from '../middlewares/userAuth'

const router = express.Router()

router.get('/sessions', adminAuth, getabsenceListsCtrl)

router.get('/professor/sessions', userAuth, getSessionsListCtrl)

router.get('/professor/absences/:id', userAuth, getAbsencesListCtrl)
.post('/professor/absences/:id', userAuth, getAbsencesListCtrl)

router.get('/professor/delete/:id', userAuth, deleteSessionCtrl)

export { router as sessionRouter }