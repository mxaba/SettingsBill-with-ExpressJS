// eslint-disable-next-line import/no-unresolved
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const settingsBill = require('./settingsBill');

const app = express();
const PORT = process.env.PORT || 5000;

// Setting the public folder
app.use(express.static('public'));

// eslint-disable-next-line no-undef
app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { settings: settingsBill().getBillSettings() });
});

app.post('/settings', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('App is running on port:', PORT);
});
