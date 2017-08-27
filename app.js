const osprey = require('osprey');
const express = require('express');
const join = require('path').join;
const app = express();
const path = join(__dirname, 'api.raml');

const router = require('./lib/router.js');



osprey.loadFile(path)
.then(ospreyMiddleware => {
  app.use('/bookapi',ospreyMiddleware);
  app.use('/bookapi',router);

  let PORT = process.env.PORT || 3000;
  app.listen(PORT, ()=>{
    console.log('Application listening on ' + PORT + '...');
  });

});
