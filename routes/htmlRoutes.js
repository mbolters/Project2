var db = require("../models");
var meteors = require("../public/js/meteor-data.js")
const moment = require('moment');
const { Op } = require('sequelize');

console.log(meteors);

module.exports = function(app) {
  // Load index page
  app.get("/", async function(req, res) {
    await db.meteorshowers.destroy({ where: {}, truncate: true
    });
    await db.meteorshowers.bulkCreate(meteors);
    let thirtyDaysFromNow = moment().add(30, 'days').format('YYYY-MM-DD')
    console.log(thirtyDaysFromNow);
    await db.meteorshowers.findAll({ where: {
      begin_date: {
        [Op.lte]: thirtyDaysFromNow,
        [Op.gte]: moment().format('YYYY-MM-DD')
      }
    }}).then(function(result) {
      res.render('index', {
        index: result
      })
    })
  });

  app.get('/event', function(req, res) {

      res.render("results", {

      })
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
