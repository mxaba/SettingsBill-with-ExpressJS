// eslint-disable-next-line import/no-unresolved
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 5000;

// Setting the public folder
app.use(express.static('public'));

// eslint-disable-next-line no-undef
app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
  console.log('App is running on port:', PORT);
});
