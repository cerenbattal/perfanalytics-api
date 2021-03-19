const express = require('express');
const { rawListeners } = require('../model/Metric');
const router = express.Router();
const Metric = require('../model/Metric');

// GET ALL THE METRICS
router.get('/', async (req, res) => {
    const query = {};
    let { fromDate, toDate } = req.query;
    console.log('req.query: ', req.query)
    
    if(!fromDate){
        query.$and = [];
        fromDate = new Date();
        fromDate.setMinutes(fromDate.getMinutes() - 30)
        fromDate = fromDate.getTime()
        console.log('fromDate YOKTU VE BIZ EKLEDIK: ', fromDate)
        query.$and.push({
            createdAt: {
                $gt: new Date(fromDate)
            }
        });
    }else if(fromDate) {
        query.$and = [];
        if(toDate){
            console.log('toDate VAR: ', toDate)
            query.$and.push({
                createdAt: {
                    $gt: new Date(fromDate*1000),
                    $lte: new Date(toDate*1000)
                }
            });
        } else {
            console.log('toDate YOK')
            query.$and.push({
                createdAt: {
                    $gt: new Date(fromDate*1000)
                }
            });
        }
    }
    console.log('fromDate: ', fromDate)
    console.log('toDate: ', toDate)
    try{
        // return all the Metrics
        const metrics = await Metric.find(query);
        res.json(metrics)
    }catch(err) {
        console.log('ERROR: ', err)
        res.json({ message: err })
    }
});

// GET METRIC BY ID
router.get('/:metricId', async (req, res) => {
    try{
        const metric = await Metric.findById(req.params.metricId)
        res.json(metric);
    }catch(err) {
        console.log('ERROR: ', err)
        res.json({ message: err })
    }

});

// DELETE METRIC BY ID
router.delete('/:metricId', async (req, res) => {
    try{
        const removedMetric = await Metric.remove({_id: req.params.metricId})
        res.json(removedMetric);
    }catch(err) {
        console.log('ERROR: ', err)
        res.json({ message: err })
    }

});


// SAVE A METRIC
router.post('/', async (req, res) => {
    console.log(req.body)

    const metric = new Metric({
        url: req.body.url,
        userAgent: req.body.userAgent,
        ttfb: req.body.ttfb,
        fcp: req.body.fcp,
        windowLoad: req.body.windowLoad,
        domLoad: req.body.domLoad,
        resMetrics: {
            resName: req.body.resMetrics.resName,
            resLoadTime: req.body.resMetrics.resLoadTime
        }
    });

    try{
        const savedMetric = await metric.save();
        console.log('DATA: ', savedMetric)
        res.json(savedMetric);
    }catch(err) {
        console.log('ERROR: ', err)
        res.json({ message: err })
    }

});

module.exports = router;