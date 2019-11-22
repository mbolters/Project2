const WolframAlphaAPI = require('@dguttman/wolfram-alpha-api');
const waApi = WolframAlphaAPI('G28HUV-QJ487E38KH');
var axios = require("axios");
var result = " ";

let query = "";
var queryURL = "http://api.wolframalpha.com/v2/query?appid=" + waApi + query+ "&output=json";

function axiosQuery(query) {
  
console.log("query url: "+queryURL);
    axios.get(queryURL)
       .then(function(res){
console.log("JSON: ",res);
console.log(res.agent.Agent._event[0] + '----' + res.agent.Agent._event[1]);

       })
           .catch(function(err){
console.log(err)
           });
     // obtain results as a complete english sentence string, 
     // i.e. "The next solar eclipse will be on Wednesday, Decemer 25, 2019."
    waApi.getSpoken(query)
    .then(function(result){
console.log('-------------------------------------------------');
console.log(result)})
        .catch(function(err){
console.log(err);
        });        
  return result;
}



        // the query result comes back as a string
        console.log('eclipse-------------------------------------------------');
        query = ' eclipse'; 
        axiosQuery(query);

     
      // the query result comes back as a string
      console.log('sunset-------------------------------------------------');
      query = 'sunset'; 
      axiosQuery(query);
  
 
       // the query result comes back as a string
       console.log('fullmoon-------------------------------------------------');
       query = 'next fullmoon'; 
       axiosQuery(query);


       // the query result comes back as a string
       console.log('meteroshower-------------------------------------------------');
       query = 'meteorshower'; 
       axiosQuery(query);

    
