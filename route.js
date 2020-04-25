
const path = require('path');
const express = require('express');
const { check, body } = require('express-validator/check');

const controller = require('./controllers/cliente');
const Cliente = require('./models/cliente');
const router = express.Router();


// /clientes => GET
router.get('/', controller.index);
// /cliente => GET
router.get('/:id',  controller.show);
// /add-cliente => POST
router.post('/',  
    [
        body('email')
        .trim()
        .isEmail()
        .withMessage('Porfavor ingrese un email valido.')
        .custom((value, { req }) => {
            
            return Cliente.findOne({ email: value }).then(clienteEmail => {
                if (clienteEmail) {
                    return Promise.reject('E-Mail ya existe. Por favor ingrese otro');
                }
            })

        })
        .normalizeEmail(),
    ],
    controller.add);
// /edit-cliente => PUT
router.put('/:id', [
    body('email')
    .trim()
    .isEmail()
    .normalizeEmail(),
],  
controller.edit);
// /delete-cliente => DELETE
router.delete('/:id', controller.delete);


module.exports = router;
