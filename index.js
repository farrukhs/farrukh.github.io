const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
app.listen(3000, () => console.log(`listening on port ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({
        status:'success',
        names: request.body.name
    });
});