const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://www.biainobokhor.ir']
}));

app.use('/snappfood', proxy('https://snappfood.ir/'));




app.listen(port, () => console.log(`Example app listening on port ${port}!`));