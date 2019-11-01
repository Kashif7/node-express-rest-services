const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

//handling the base URL get requests
app.get('/', (request, response) => {
    response.send('Welcome to my API');
});

app.listen(port, () => {
    console.log("Running on ", port);
});