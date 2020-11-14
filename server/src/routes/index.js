const express = require('express');
const router = express.Router();
const Workbook = require('../models/workbook');
const cryptoRandomString = require('crypto-random-string');
const { check, validationResult } = require('express-validator');

const postValidator = [
    check('name').exists().withMessage('name is not null'),
    check('cont').exists().withMessage('cont is not null'),
    check('inits').exists().withMessage('inits is not null'),
    check('code').exists().withMessage('code is not null'),
    check('score').exists().withMessage('score is not null'),
    check('sample').exists().withMessage('sample is not null')
]

router.get('/workbooks',async(req,res) => {
    try{
        var workbook = await Workbook.find({})
        var result = []

        if (workbook.length == 0){
            res.json({code: 21, data : {msg : "Information Not Exist", err : "Information Not Exist"}});
        }else{
            workbook.map((item) => {
                result.push({
                    id : item.id,
                    name : item.name
                })
            })
            res.json({code: 0, data : {msg : "Success", items : result}});
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
})

router.get('/workbooks/:workbook_id',async(req,res) => {
    try{
        var workbook = await Workbook.findOne({id : req.params.workbook_id});

        if (workbook === null){
            res.json({code: 21, data : {msg : "Information Not Exist", err : "Information Not Exist"}});
        }else{
            var result = {
                id : workbook.id,
                name : workbook.name,
                cont : workbook.cont,
                inits : workbook.inits,
                sample : workbook.sample
            }
            res.json({code: 0, data : {msg : "Success", items : result}});
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
})

router.post('/workbooks', postValidator, (req,res) => {
    try{
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            res.json({ code: 43, data: { msg: 'Validation errors', err: errors } });
        } else {
            var workbook = new Workbook();
            workbook.id = cryptoRandomString({length:8});
            workbook.name = req.body.name;
            workbook.cont = req.body.cont;
            workbook.inits = req.body.inits;
            workbook.code = req.body.code;
            workbook.score = req.body.score;
            workbook.sample = req.body.sample;
            workbook.save()
            .then((item) => {
                res.json({code: 0, data: { msg: "Information Register Successful", item : {id : item.id}}});
            })
            .catch((err) =>{
                console.log(err)
                res.json({code: 29, data: { msg: "Information Not Register", err : err}});
            });
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
})

router.patch('/workbooks/:workbook_id', postValidator,(req,res) => {
    try{
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res.json({ code: 43, data: { msg: 'Validation errors', err: errors } });
        } else {
            Workbook.findOneAndUpdate({id : req.params.workbook_id},{
                name : req.body.name,
                inits : req.body.inits,
                code : req.body.code,
                score :req.body.score
            })
            .then((item) => {
                res.json({code: 0, data: { msg: "Information Modify Successful", item : {id : item.id}}});
            })
            .catch((err) => {
                console.log(err)
                res.json({code: 29, data: { msg: "Information Not Register", err : err}});
            })
        }
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
});

router.delete('/workbooks', (req,res) =>{
    try{
        Workbook.deleteMany()
        .then(() => {
            res.json({code: 0, data: { msg: "Delete Successful" }});
        })
        .catch((err)=>{
            console.log(err)
            res.json({code: 29, data: { msg: "Delete Fail" , err: err}});
        })
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
})

router.delete('/workbooks/:workbook_id', (req,res) =>{
    try{
        Workbook.deleteOne({id: req.params.workbook_id})
        .then(() => {
            res.json({code: 0, data: { msg: "Delete Successful" }});
        })
        .catch((err) => {
            console.log(err)
            res.json({code: 29, data: { msg: "Delete Fail" , err: err}});
        })
    }catch(err){
        console.log(err);
        res.json({code: 500, data : { msg: "Internal Server Error", err: err}});
    }
})

module.exports = router;