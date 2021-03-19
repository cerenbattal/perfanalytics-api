class PerformanceAnalytics {
    constructor() {
        this.url = window.location.href,
        this.userAgent = navigator.userAgent,
        this.apiUrl = 'http://localhost:3000/metrics'
    }

    getResourceLoadTimes = (resourceListEntries) => {
        let resourceLoadsObject = {}, resourceLoadsArray = [];
        resourceListEntries.forEach(resource => {
            resourceLoadsObject = {
                resName: resource.name,
                resLoadTime: resource.responseEnd - resource.startTime
            }
            resourceLoadsArray.push(resourceLoadsObject);
        });
        return resourceLoadsArray;
    }

    isPerformanceSupported = () => {
        return window.performance && !!window.performance.getEntriesByType
    }

    getMetrics = () => {
        return new Promise((resolve, reject) => {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (this.isPerformanceSupported()) {
                        const perfNavigationEntries = performance.getEntriesByType("navigation")[0];
                        const perfPaintEntries = performance.getEntriesByType("paint")[0];
                        const resourceListEntries = performance.getEntriesByType("resource");
                        const performanceAnalytics = {
                            url: this.url,
                            userAgent: this.userAgent,
                            ttfb: perfNavigationEntries.responseStart - perfNavigationEntries.requestStart,
                            fcp: perfPaintEntries ? perfPaintEntries.startTime : 0,
                            windowLoad: perfNavigationEntries.domContentLoadedEventEnd - perfNavigationEntries.domContentLoadedEventStart,
                            domLoad: perfNavigationEntries.domComplete,
                            resMetrics: this.getResourceLoadTimes(resourceListEntries).length > 0 ? this.getResourceLoadTimes(resourceListEntries) : {resName: "no resname", resLoadTime: 0}
                        }
                        console.log(performanceAnalytics);
                        resolve(performanceAnalytics);
                    } else {
                        reject('Your browser does not support performance navigation api...');
                    }
                }, 0)
            })
        })
        
    }

    sendMetrics(metrics) {
        fetch(this.apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'gzip'
          },
          body: JSON.stringify(metrics),
        }).then((response) => console.log(response.body));
    }

}

const performanceAnalytics = new PerformanceAnalytics();
performanceAnalytics.getMetrics().then((metricData) => {
    performanceAnalytics.sendMetrics(metricData);
}, (err) => {
    console.log(err)
});

