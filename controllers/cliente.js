const Cliente = require('../models/cliente');
const { validationResult } = require('express-validator/check');
const aqp  = require('api-query-params');
const logger = require('../util/logger');

// query params
// https://github.com/loris/api-query-params#readme
exports.index = (req, res, next) => {
    logger.info("Acceso a servicio clientes : index ");

    const { filter, skip, limit, sort, projection } = aqp(req.query);
    try {
        Cliente.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .exec((err, result) => {
            if (result) {
                res.json(result);
            } else {
                res.sendStatus(404);
                logger.info("404 - Recurso no encontrado - Acceso a servicio clientes : index ");
            }
        })

    } catch (error) {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error de red. intentelo nuevamente"
        });
    }
    

};

exports.show = (req, res, next) => {
    logger.info("Acceso a servicio clientes : show ");

    const Id = req.params.id;
    Cliente.findById(Id)
    .then(cliente => {
        if(cliente){
            res.send(cliente);
        } else {
            logger.info("404 - Recurso no encontrado - Acceso a servicio clientes : show - id " + Id);
            return res.status(404).send({
                message: "El Cliente no ha sido encontrado " 
            });  
        }
    })
    .catch(err => {
        logger.info("500 - Ha ocurrido un error de red - Acceso a servicio clientes : show - id" + Id);
        res.status(500).send({
            message: err.message || "Ha ocurrido un error de red. intentelo nuevamente"
        });
    });
};

exports.add = (req, res, next) => {
    logger.info("Acceso a servicio clientes : add ");

    if (!req.body) {
        logger.info("400 - Envio de datos vacios - Acceso a servicio clientes : add ");
        return res.status(400).send({
            message: "El cliente no puede ir vacio"
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validaciones.');
        error.statusCode = 422;
        error.data = errors.array();
        return res.send(error);
    }

   
    const nombres = req.body.nombres;
    const email = req.body.email;

    const cliente = new Cliente({
        nombres:nombres,
        email:email,
    });

    cliente.save()
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        logger.info("500 - Ha ocurrido un error de red - Acceso a servicio clientes : add ");
        res.status(500).send({
            message: err.message || "Ha ocurrido un error de red. intentelo nuevamente"
        });
    });
};

exports.edit = (req, res, next) => {
    logger.info("Acceso a servicio clientes : edit ");

    if (!req.body) {
        logger.info("400 - Envio de datos vacios - Acceso a servicio clientes : edit ");
        return res.status(400).send({
            message: "El cliente no puede ir vacio"
        });
    }

        const Id = req.params.id;

        Cliente.findByIdAndUpdate(Id, {
            nombres:req.body.nombres,
            email:req.body.email,
        })
        .then(cliente => {
            if (!cliente) {
                logger.info("404 - Recurso no encontrado - Acceso a servicio clientes : edit - id " + Id);
                return res.status(404).send({
                    message: "El Cliente no ha sido encontrado"
                });
            }
            res.send(cliente);
        })
        .catch(err => {
            logger.info("500 - Ha ocurrido un error de red - Acceso a servicio clientes : edit ");
            res.status(500).send({
                message: err.message || "Ha ocurrido un error de red. intentelo nuevamente"
            });
        });
};

exports.delete= (req, res, next) => {
    logger.info("Acceso a servicio clientes : delete ");
    const Id = req.params.id;

    Cliente.findById(Id)
        .then(cliente => {

            if (!cliente) {
                logger.info("404 - Recurso no encontrado - Acceso a servicio clientes : delete - id " + Id);
                return res.status(404).send({
                    message: "El Cliente no ha sido encontrado"
                })
            }
            return Cliente.deleteOne({ _id: Id });

        }).then(() => {
            res.status(200).json({ message: 'Success deleted!' });
        })
        .catch(err => {
            logger.info("500 - Ha ocurrido un error de red - Acceso a servicio clientes : delete ");
            res.status(500).send({
                message: err.message || "Ha ocurrido un error de red. intentelo nuevamente"
            });
        });
    
};


