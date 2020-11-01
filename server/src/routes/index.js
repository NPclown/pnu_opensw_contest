const express = require('express');
const router = express.Router();
const Workbook = require('../models/workbook');
    
router.get('/workbooks',async(req,res) => {
    try{
        var result = await Workbook.find({})
        res.json({result : result});
    }catch(err){
        console.log(err);
        res.send(false)
    }
})

router.get('/workbooks/:workbook_id',async(req,res) => {
    try{
        var result = await Workbook.findOne({id : req.params.workbook_id});
        res.json({result : result});
    }catch(err){
        console.log(err);
        res.send(false)
    }
})

router.post('/workbooks',async(req,res) => {
    try{
        var workbook = new Workbook();
        workbook.id = '3';
        workbook.name = req.body.name;
        workbook.inits = req.body.inits;
        workbook.code = req.body.code;
        workbook.score = req.body.score;
        await workbook.save();
        res.json({result : true});
    }catch(err){
        console.log(err)
        res.json({result : err});
    }
})

router.patch('/workbooks/:workbook_id', async(req,res) => {
    try{
        await Workbook.findOneAndUpdate({id : req.params.workbook_id},{
            name : req.body.name,
            inits : req.body.inits,
            code : req.body.code,
            score :req.body.score
        });
        res.json({result : await Workbook.findOne({id:req.params.workbook_id})});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
});

router.delete('/workbooks', async(req,res) =>{
    try{
        await Workbook.deleteMany();
        res.json({result : true});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
})

router.delete('/workbooks/:workbook_id', async(req,res) =>{
    try{
        await Workbook.deleteOne({id: req.params.workbook_id})
        res.json({result : true});
    }catch(err){
        console.log(err);
        res.json({result : err})
    }
})

module.exports = router;