var db = require("../models");
const Datastore = require('nedb');
const fetch = require('node-fetch');
const passport = require('passport');


const myVars = {
  domain: 'stargazersproject.auth0.com',
  clientID: '4u6Y6XtPah8d7MYPcmEK1MHQ8sCNTNiI',
  clientSecret: '7XWhngqngeJIpT7SxzfVlZUkR7CwsUCR8J6Td1D4Smdng6PeSzL_7QdCpjJiowHb',
  callbackURL: 'http://localhost:3000/callback'
}

module.exports = function(app) {
  // auth0
  app.get('/layouts', function(req, res, next) {
    res.render('main');
  });

  // auth0 login function
  app.get('/login', passport.authenticate('auth0', {
    clientID: myVars.clientID,
    domain: myVars.domain,
    redirectUri: myVars.callbackURL,
    responseType: 'code',
    audience: 'https://stargazersproject.auth0.com/api/v2/',
    scope: 'openid profile'}),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/failure'
    }),
    function(req, res) {
        res.redirect('/user');
    }
  );

  app.get('/user', function(req, res, next) {
    res.render('user', {
      user: req.user
    })
  });

  app.get('/failure', function(req, res, next) {
    res.render('404');
  });

  app.get("/api/meteorshowers", function(req, res) {
    db.meteorshowers.findAll({}).then(function(Result) {
      res.json(Result);
    });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // enDB creator
  const database = new Datastore('coords.db');
  database.loadDatabase();

  // geolocation data
  app.post('/api', (request, response) => {
    console.log('succesful request');
    // console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
  });

  app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    // const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/ef516e4b2e594d932c47badeee23c8bb/${lat},${lon}/?units=us`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
    const forecast_response = await fetch(weather_url);
    const forecast_data = await forecast_response.json();
    const data = {
      weather: weather_data,
      forecast: forecast_data
    };
    response.json(data);
  });
  

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
