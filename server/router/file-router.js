const { Router } = require('express')
const router = new Router()
const CreateExcel = require('../controllers/createExcel-controller')

router.get('/api/file/create', CreateExcel.createFile)
router.get('/api/file/download/:fileName', CreateExcel.downloadFile)
router.get('/api/file/download', CreateExcel.downloadProductsFil)

module.exports = router
