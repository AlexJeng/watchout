var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', function(req, res) {
  res.sendFile(__dirname + '/styles.css');
});
app.get('/watchout.js', function(req, res) {
  res.sendFile(__dirname + '/watchout.js');
});
app.get('/d3.js', function(req, res) {
  res.sendFile(__dirname + '/d3.js');
});
app.get('/player.js', function(req, res) {
  res.sendFile(__dirname + '/player.js');
});

io.on('connection', function (socket) {
  socket.broadcast.emit('newUser', 'New Challenger');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });


  // updateEnemyPosition();

});

  var numEnemies = 20;
  var screenWidth = 800;
  var screenHeight = 400;

  var updateEnemyPosition = function(){
    var newLocations = [];
    for(var i=0; i<numEnemies; i++){
      var x = Math.floor(Math.random()*screenWidth);
      var y = Math.floor(Math.random()*screenHeight);
      newLocations.push([[x,y]]);
    }
    var random = Math.random()*10;
    //return random;
    io.emit('enemyLocations', newLocations);
    // socket.broadcast.emit('enemyLocations', newLocations);
  };
  var updateEnemyPositionInterval = setInterval(function(){
    updateEnemyPosition();
  }, 1000);

