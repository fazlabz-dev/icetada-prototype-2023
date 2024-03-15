const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');
var bodyParser=require("body-parser");
var session = require('express-session')

/*app.get('/', (req, res) => {
  res.send('IceTube is under construction')
})*/

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: '64_zwW!Oz',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

require('./routes/get_video')(app);
require('./routes/user_profile')(app);
require('./routes/watch')(app);
require('./routes/uploader')(app);
require('./routes/index')(app);
require('./routes/register')(app);

app.use(express.static('www'));

app.listen(port, () => {
  console.log(`icetube is listening on ${port}`)
})
