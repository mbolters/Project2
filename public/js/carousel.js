
var axios = require("axios");

const WolframAlphaAPI = require('@dguttman/wolfram-alpha-api');
const waApi = WolframAlphaAPI('G28HUV-QJ487E38KH');




function axiosQuery(query) {
var queryURL = "http://api.wolframalpha.com/v2/query?appid=" + waApi + query+ "&output=json";
    
console.log("query url: "+queryURL);
    axios.get(queryURL)
       .then(function(res){
       })
           .catch(function(err){
console.log(err)
           });
     // obtain results as a complete english sentence string, 
     // i.e. "The next solar eclipse will be on Wednesday, Decemer 25, 2019."
    waApi.getSpoken(query)
    .then(function(result){
console.log('------------------------------------------------');
console.log(result)})
        .catch(function(err){
console.log(err);
        });        
  return result;
}



// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function() {
    $("#eclipse").on("click", function(event) {  
        // the query result comes back as a string
        query = 'when is the next eclipse'; 
        axiosQuery(query);
    })


    $("#sunset").on("submit", function(event) {
     
      // the query result comes back as a string
      query = 'when is the next sunset'; 
      axiosQuery(query);
    });

  
    $("#fullmoon").on("click", function(event) {
       // the query result comes back as a string
       query = 'when is the next fullmoon'; 
       axiosQuery(query);
    });

    $("#meteorShowers").on("submit", function(event) {
       // the query result comes back as a string
       query = 'when is the next meteorshower'; 
       axiosQuery(query);
  });
    
  });
  