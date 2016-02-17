# Performance
Measuring web app runtime performance, only for Chrome browser
# How is working
Let’s summarize the metrics that you must track, in order to measure the runtime performance of a web application


#### 1. InstallationTime to load
        This event is fired once all of the document’s resources (images, CSS, JavaScripts, …) have been fully loaded
#### 2. Time to first paint:
        This allows us to understand how much time is needed until your user sees something on the screen
#### 3. Time to DOM content load:
        This event is fired when all of the page’s DOM content has been loaded and parsed
#### 4. Time to finish: 
        The total time from the beginning of the request until everything is finished, including scripts’ processing
#### 5. Is First Load: 
        Helps us ensure that we are requesting a page without any cached resources
#### 6. Time to first byte: 
        This is basically a way to measure latency
#### 7. Number of requests:
        Total requests, # of css files, # of javascript files, …

### Version
v1.0.1

You need Gulp installed globally:
```sh
$ npm i -g gulp
```
```sh
$ git clone https://github.com/ksankumar/measure-performance
```
```html
<script type="text/javascript" src="lib/performance.js"></script>
```

# Measure-performance API

## init
```js
performance.init(delay); //5000
```
    * delay - measure the performance with specific time delay, default 2 sec (1000 = 1sec)
# Note :warning:
  Add performance.js within end of the ``` <body></body> ```
## About
End of course ksankumar is open source with a [public repository][ksankumar]
 on GitHub.

## Reference

[Chrome performance API](https://developer.chrome.com/devtools/docs/network)

License
----
MIT

**Free Software, Santhosh Kumar Krishnan!**
