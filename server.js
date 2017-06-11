const express = require('express');
const request = require("request");
const hbs = require('hbs');

const app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Some middlewhere
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`)
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('testHelper', () => {
  return 'Dieter Botha from helper';
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello Boet!',
  });
});

var test = { a: 1, b: 2};

app.get('/netwealth', (req, res) => {
  res.render('netwealth.hbs', {
    pageTitle: 'Net Wealth (server)',
    fxRate: test
  });
});





// /bad - send back JSON with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, function(){
  console.log('App listening on port 3000')
})
