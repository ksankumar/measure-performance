/**
 * Copyright (c) 2016 Santhosh Kumar, Krishnan
 * @license The MIT License (MIT)
 * @description Measuring web app runtime performance.
 * @author Santhosh Kumar Krishnan, https://www.linkedin.com/in/ksankumar
 * @version v1.0.1
 **/
(function() {
    var now = performance.now();

    function load() {
        var timing = performance.timing,
            performanceData = {},
            requestEntries = performance.getEntries(),
            ext = {
                'js': (/\.(js)$/i),
                'css': (/\.(css)$/i),
                'img': (/\.(gif|jpe?g|tiff|png|bmp)$/i),
                'font': (/\.(ttf|otf|eot|svg|wof2?f)$/i)
            },
            _type = '',
            filteredObj = [];

        requestEntries.filter(function(ele) {
            _type = 'OTHER';
            if (ext.js.test(ele.name)) {
                _type = 'JS';
            } else if (ext.css.test(ele.name)) {
                _type = 'CSS';
            } else if (ext.img.test(ele.name)) {
                _type = 'IMG';
            } else if (ext.font.test(ele.name)) {
                _type = 'FONT';
            }

            entries = {
                'fileName': ele.name,
                'loadTime': ((ele.duration / 1000) % 60).toFixed(3) + ' sec',
            };

            obj = filteredObj[_type] || {
                'files': [],
                'count': 0
            };

            obj.files.push(entries);
            obj.count = obj.count + 1;
            obj.longLoad = obj.longLoad || entries;
            obj.longLoad = parseFloat((obj.longLoad.loadTime).split(' ')[0]) < parseFloat((entries.loadTime).split(' ')[0]) ? entries : obj.longLoad;
            filteredObj[_type] = obj;
        });

        performanceData = {
            PageName: window.location.pathname,
            StyleSheets: filteredObj.CSS || 0,
            Images: filteredObj.IMG || 0,
            JavaScripts: filteredObj.JS || 0,
            Fonts: filteredObj.FONT || 0,
            OtherFiels: filteredObj.OTHER || 0,
            FilesCount: requestEntries.length,
            TimeToFirstByte: timing.responseStart - timing.navigationStart + ' ms',
            TimeToDOMContentLoad: ((timing.domContentLoadedEventEnd - timing.navigationStart) / 1000) % 60 + ' sec',
            TimeToFirstPaint: Math.round((window.chrome.loadTimes().firstPaintTime * 1000) - (window.chrome.loadTimes().startLoadTime * 1000)) + ' ms',
            TimeToLoad: ((timing.loadEventEnd - timing.navigationStart) / 1000) % 60 + ' sec',
            TimeToFinish: (Math.ceil(now) / 1000) % 60 + ' sec',
            IsFirstLoad: requestEntries.filter(function(element) {
                return element.duration === 0;
            }).length === 0 ? 1 : 0,
            LoadDuration: timing.loadEventEnd - timing.loadEventStart
        };
        console.log('**************** Performance Data ****************');
        console.log(performanceData);
        console.log('**************** Performance Data ****************');
    }

    var Performance = function() {};
    Performance = Performance.prototype = {
        init: function(delay) {
            if ((navigator.userAgent.indexOf("Chrome")) === -1)
                throw 'Performance.js supported only in Chrome browser.';

            delay = delay !== null && delay !== undefined && Number.isInteger(delay) ? delay : 2000;

            window.onload = setTimeout(load, delay);
        }
    };
    /* AMD/RequireJS */
    if (typeof define !== 'undefined' && define.amd) {
        define([], function() {
            return Performance;
        });
    }
    /* CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Performance;
    } else { /*Plain javascript library*/
        window.Performance = Performance;
    }
})();