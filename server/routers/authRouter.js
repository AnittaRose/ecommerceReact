const express = require ('express');
const router = express.Router();
const authcontroller = require ('../controllers/authcontroller');


router.post('/login',authcontroller.login);



module.exports = router