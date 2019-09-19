const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '1mb'}));

// app.get('/', function(req, res){
//    res.redirect('/undex.html');
// });

app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({
        status:'success',
        names: request.body.name
    });
});