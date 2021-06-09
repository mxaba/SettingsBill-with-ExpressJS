// eslint-disable-next-line import/no-unresolved
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const settingsBill = require('./settingsBill');

const settingsBillInstance = settingsBill();
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
  res.render('index', {
    getSetObject: settingsBillInstance.getBillSettings(),
    getTotals: settingsBillInstance.getTotals(),
    grandTotal: settingsBillInstance.grandTotal(),
    addClass: settingsBillInstance.addClass(),
  });
});

app.post('/settings', (req, res) => {
  settingsBillInstance.setBillSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
  });
  res.redirect('/');
});

app.post('/action', (req, res) => {
  settingsBillInstance.makeCallOrSms(req.body.billItemTypeWithSettings);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('App is running on port:', PORT);
});
