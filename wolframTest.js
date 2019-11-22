
// // https://products.wolframalpha.com/api/libraries/javascript/
// // 1 npm i -g npm 
// // 2 Next, import the class, and instantiate it with your 'AppID':

// var WolframAlphaAPI = require('./ssswolframAPI.js');
// var waApi = WolframAlphaAPI('DEMO');

// //
// // 3
// waApi.getFull({....



  

/**
                 * Build a URL call from a baseUrl and query; 
                 * 
                 * Supports four 'output' formats:
                 * 'string' and 'xml' are both strings,
                 * 'json' is an Object (a result of JSON.parse), and
                 * 'image' is a string of a "Data URI"
                 * !typedef OutputFormat
                 * !property {'string'|'json'|'image'|'xml'} output
              
**/

const WolframAlphaAPI = require('@dguttman/wolfram-alpha-api');
const waApi = WolframAlphaAPI('G28HUV-QJ487E38KH');
var axios = require("axios");
const query = "is there an eclipse today";
var queryURL = "http://api.wolframalpha.com/v2/query?appid=DEMO&i=" + query+ "&output=json";

//console.log("query url: "+queryURL);
axios.get(queryURL)
    .then(function(res){
// console.log("JSON: ",res);
// console.log("data: ",res.data.queryresult);
// console.log(" status :" + res.status, " statusText: " + res.status.statusText);
    
    })
        .catch(function(err){
        // console.log(err)
        })


               

// The following methods (Spoken, Simple, Short, Full) take 'input' (which is either a string, or an object of parameters)


// Example: waApi.getSpoken('2+2').then(console.log, console.error); 
// answer:  "The answer is 4"
waApi.getSpoken('is there an eclipse today')
    .then(function(result){
        console.log('----------------------------------spoken--------------------');
        console.log(result)})
        .catch(function(err){
            console.log(err);
                             });                                                         
                              

// Example:  waApi.getSimple({i: 'nyc to la', units: 'metric'}).then(console.log, console.error);
// answer: "data:image/gif;base64,R0lGODlhHAJNBfcAAAAAAAAEAAgICAgMCBAQEBAUEBgYGBgcGCAgICAkICksKSkoK...
// waApi.getSimple('is there an eclipse today')
// .then(function(result){
//     console.log('----------------------------------simple--------------------');
//     console.log(result)})
//     .catch(function(err){
//         console.log(err);
//                          });    
// add code for .then and .catch                                 
 
Example: waApi.getShort('2+2').then(console.log, console.error);
answer: "4"
waApi.getShort('eclipse')
.then(function(result){
    console.log('----------------------------------short--------------------');
    console.log(result)})
    .catch(function(err){
        console.log(err);
                         });    




//Example waApi.getFull('2+2').then(console.log, console.error);
// answer: {success: true, error: false, numpods: 6, datatypes: 'Math', timedout: '', timing: 1.08 ...

waApi.getFull('is there an eclipse today')
.then(function(result){
    console.log('----------------------------------full--------------------');
    console.log(result);
    console.log(result.pods[1]);

})
    .catch(function(err){
        console.log('ooops FULL error');
        console.log(err);
                         });    
// add code for .then and .catch


