import express from 'express'
import { createSectorCtrl, deleteSectorCtrl, getSectorsCtrl, updateSectorCtrl } from '../controllers/admin/sectorCtrl'
import { adminAuth } from '../middlewares/adminAuth'

const router = express.Router()


router.get('/sectors', adminAuth, getSectorsCtrl)

router.get('/add_sector', adminAuth, createSectorCtrl)
.post('/add_sector', adminAuth, createSectorCtrl)

router.get('/update_sector/:id', adminAuth, updateSectorCtrl)
.post('/update_sector/:id', adminAuth, updateSectorCtrl)

router.get('/delete_sector/:id', adminAuth, deleteSectorCtrl)


export {router as sectorsRouter}