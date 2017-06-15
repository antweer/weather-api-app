var express = require('express');
var app = express();
var apicache = require('apicache');
var cache = apicache.middleware;
var axios = require('axios');

app.set('view engine', 'hbs');

app.use('/axios', express.static('node_modules/axios/dist'));

app.get('/', function(request, response){
  response.render('axios.hbs', {});
});

var DARK = process.env.DARKSKY_KEY
app.get('/api/:lat/:long', cache('5 minutes'), function(request, response, next){
  var lat = request.params.lat;
  var long = request.params.long;
  axios.get('https://api.darksky.net/forecast/' + DARK + '/'+lat+','+long).then(function(r){
      response.json(r.data);
    })
    .catch(next);
}); 

var PORT = process.env.PORT || 8000;
app.listen(PORT, function(){
  console.log('Listening on port ' + PORT);
});