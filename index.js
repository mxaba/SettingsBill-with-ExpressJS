// eslint-disable-next-line import/no-unresolved
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('App is running on port: ', PORT);
});
