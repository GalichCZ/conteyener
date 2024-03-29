const excelService = require('../service/createExcel-service')

class FileController {
  async createFile(req, res) {
    const result = await excelService.createFile()
    if (result.success) res.status(200).json(result)
    else res.status(400).json(result.error)
  }

  async downloadFile(req, res) {
    const result = await excelService.downloadFile(req.params.fileName)
    if (result.success) res.download(result.filePath)
    else res.status(400).json(result.error)
  }

  async downloadProductsFil(req, res) {
    const result = await excelService.downloadProductsFile()
    if (result.success) res.download(result.filePath)
    else res.status(400).json(result.error)
  }
}

module.exports = new FileController()
