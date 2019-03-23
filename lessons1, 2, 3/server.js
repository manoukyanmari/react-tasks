const express = require('express');
const app =  express();
const path =  require('path');

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 5000);