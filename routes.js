'use strict';

// This handles routing for the website, pointing requests to
// the appropriate view renderer.
module.exports = function(app){

  var index = require('./controllers/index');

  app.get('/', index.render);
  
};
