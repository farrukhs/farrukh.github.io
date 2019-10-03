const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '1mb'}));


var socket = require('socket.io');
const io = socket(server);

const news = ['SANTIAGO, Chile — A powerful magnitude 6.8 earthquake shook the coast of Chile on Sunday, swaying buildings in the capital of Santiago. The national emergency agency said there were no reported injuries or damage to basic services.', '', '']
function intervalFunc() {
    io.sockets.emit('news', {newsItem : news[0]});
}
setInterval(intervalFunc,45000);


//io.sockets.on('connection', newConnection);

// function newConnection(socket){
//     console.log('new connection: ' + socket.id);
//     function intervalFunc() {
//         io.sockets.emit('test', {test:'test'});
//     }
//     setInterval(intervalFunc,1500);
    
// }

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