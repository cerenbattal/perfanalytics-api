const mongoose = require('mongoose');

const MetricSchema = mongoose.Schema({
    /**
     * Metrics are:
     * url
     * userAgent
     * ttfb
     * fcp
     * windowLoad
     * domLoad
     * resMetrics (resName, resLoadTime)
     */
    url: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ttfb: {
        type: Number,
        required: true
    },
    fcp: {
        type: Number,
        required: true
    },
    windowLoad: {
        type: Number,
        required: true
    },
    domLoad: {
        type: Number,
        required: true
    },
    resMetrics:[{
        resName: {
          type: String,
          required: true
        },
        resLoadTime: {
          type: Number,
          required: true
        }
    }],
}, 
{ 
    timestamps: true
})

module.exports = mongoose.model('Metric', MetricSchema)