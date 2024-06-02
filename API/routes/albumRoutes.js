const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// Här har vi CRUD-routesen:

//get för alla dokument:
router.get('/', albumController.getAll);
//get för enskilt dokument:
router.get('/:id', albumController.getById);
//post:
router.post('/', albumController.create);
//put
router.put('/:id', albumController.update);
//delete:
router.delete('/:id', albumController.delete);

//modulen exporteras som router:
module.exports = router;