let express = require('express');
const { allUsers, lastUser, profile } = require('../../controllers/api/usersController');
let router = express.Router();

// obtener todos los usuarios
router.get('/', allUsers);

// obtener ultimo usuario
router.get('/last', lastUser);

//Usuario por pk
router.get('/:id', profile); 

module.exports = router;
