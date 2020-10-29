const express = require('express');
const router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
const db = low(adapter)            

router.get('/workbooks',(req,res) => {
    var result = db.get('workbook').value();
    res.json({result : result});
})

router.get('/workbooks/:workbook_id',(req,res) => {
    var result = db.get('workbook').find({id : req.params.workbook_id}).value();
    res.json({result : result});
})

router.post('/workbooks',(req,res) => {
    try{
        db.get('workbook').push({
            id : "3",
            name : req.body.name,
            cont : req.body.cont,
            init_c : req.body.init_c,
            init_cpp : req.body.init_cpp,
            init_java : req.body.java,
            init_py : req.body.init_py,
            init_py3 : req.body.init_py3
        }).write();
        res.json({result : true});
    }catch(err){
        console.log(err)
        res.json({result : err});
    }
})

router.patch('/workbooks/:workbook_id', (req,res) => {
    try{
        db.get('workbook')
        .find({id : req.params.workbook_id})
        .assign({
            name : req.body.name,
            cont : req.body.cont,
            init_c : req.body.init_c,
            init_cpp : req.body.init_cpp,
            init_java : req.body.java,
            init_py : req.body.init_py,
            init_py3 : req.body.init_py3
        }).write();
        res.json({result : true});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
});

router.delete('/workbooks', (req,res) =>{
    try{
        db.get('workbook')
        .remove()
        .write();
        res.json({result : true});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
})

router.delete('/workbooks/:workbook_id', (req,res) =>{
    try{
        db.get('workbook')
        .remove({id : req.params.workbook_id})
        .write();
        res.json({result : true});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
})

module.exports = router;