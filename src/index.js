'use strict';

import ttiPolyfill from './path/to/tti-polyfill.js';

// 利用 requestIdleCallback 调度任务执行
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });

function myNonEssentialWork(deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    doWorkIfNeeded();
  }
  if (tasks.length > 0) {
    requestIdleCallback(myNonEssentialWork);
  }
}

// 测量 tti
ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});

// 测量自定义时间标记，如 FMP
function measurePerf() {
  var perfEntries = performance.getEntriesByType("mark");
  for (var i = 0; i < perfEntries.length; i++) {
    console.log("Name: " + perfEntries[i].name +
      " Entry Type: " + perfEntries[i].entryType +
      " Start Time: " + perfEntries[i].startTime +
      " Duration: "   + perfEntries[i].duration  + "\n");
  }
}

// 测量长任务
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});

// 测量 FP/FCP
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
