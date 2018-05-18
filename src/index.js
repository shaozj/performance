'use strict';

!(function() {
  if ('PerformanceLongTaskTiming' in window) {
    var g = (window.__tti = { e: [] });
    g.o = new PerformanceObserver(function(l) {
      g.e = g.e.concat(l.getEntries());
    });
    g.o.observe({ entryTypes: ['longtask'] });
  }
})();

// 性能度量结果对象数组
const metrics = [];

if ('PerformanceLongTaskTiming' in window) {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);
      metrics.push({
        eventCategory: 'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true
      });
    }
  });
  observer.observe({ entryTypes: ['paint'] });
}
