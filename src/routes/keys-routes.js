const express = require('express')

const router = express.Router()

const apiKeyController = require('../controllers/api-key-controller')
const {catchErrors} = require('../middleware/error-handlers')

router.post('/', catchErrors(apiKeyController.post))
router.get('/', catchErrors(apiKeyController.read))
router.delete('/', catchErrors(apiKeyController.delete))

module.exports = router;