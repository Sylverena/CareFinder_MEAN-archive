/**
 * api-routes.js - Application routing
 *
 * Copyright notice at the end of the file.
 *
 */



const express = require('express')



// Common routes
const hospitalsRoutes = require('./hospitals-routes')
const keysRoutes = require('./keys-routes')



const router = express.Router()

router.use('/hospitals', hospitalsRoutes)
router.use('/keys', keysRoutes)

module.exports = router