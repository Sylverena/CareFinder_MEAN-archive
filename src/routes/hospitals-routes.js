/**
 * hospitalsRoutes.js - The hospitals router
 *
 * Copyright notice at the end of the file.
 *
 * This file is the router file for the hospitals.  It routes URI endpoints to
 * controller functions.  The routes support CRUD architecture.
 */



const express = require('express');


const hospitalsController = require('../controllers/hospitals-controller');
const {catchErrors} = require('../middleware/error-handlers')


const router = express.Router();


// CRUD Controller for the Hospital(s)
// -----------------------------------


// Remember that here, the '/' is relative to the '/hospitals'
// route defined in api-routes.js as "router.use('/hospitals', hospitalsRoutes)"


// All routes require a valid access token, i.e., the user must be logged in.


// todo: should be an admin-only route
// (C)reate a new hospital with given information
// POST /hospitals
// Example: POST http://localhost:3000/hospitals
router.post('/', catchErrors(hospitalsController.create))


// (R)ead a hospital(s) in various ways
// GET /hospitals?<list of query parameters>
// Example: GET http://localhost:3000/hospitals?city=CHICAGO
//router.get('/', accessTokenRequired, catchErrors(hospitalsController.read))
router.get('/', catchErrors(hospitalsController.read))


// todo: should be an admin-only route
// (U)pdate/create a specific hospital with given information
// PUT /hospitals/{hospitalId}
// Example: POST http://localhost:3000/hospitals/5e10bda58d57e80faa871867
router.put('/:id', catchErrors(hospitalsController.update))


// todo: should be an admin-only route
// (U)pdate-Patch a hospital with given information
// PATCH /hospitals/{hospitalid}
router.patch('/:id', catchErrors(hospitalsController.patch))


// todo: should be an admin-only route
// (D)elete a hospital by its hospitalid
// Example: DELETE http://localhost:3000/hospitals?id=5e0a9e3245a13ed2ba4e8d4d
router.delete('/:id', catchErrors(hospitalsController.delete))


module.exports = router;