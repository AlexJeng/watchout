var WatchOut = function() {
  this._score = 0;
  this._highScore = 0;
  this._height = 400;
  this._width = 800;
  this._enemies = 20;
  this._numCollisions = 0;
  this._svg;
  this.init();
  this._player = new Player(this._width / 2, this._height / 2);
};

WatchOut.prototype.init = function() {
  var svg = d3.select('body').append('svg')
          .attr('width', this._width)
          .attr('height', this._height);

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%');
  for (var i = 0; i < this._enemies; i++) {
    svg.append('circle')
          .attr('class', 'enemies')
          .attr('cx', Math.random() * this._width)
          .attr('cy', Math.random() * this._height)
          .attr('r', 5)
          .attr('fill', 'blue');
  }
  this._svg = svg;
};

WatchOut.prototype.update = function(data) {
  // console.log("UPDATE in watchout.js");
  // var circle = this._svg.selectAll('.enemies')
  //               .transition()
  //               .duration(750)
  //               .attr('cx', function(d, i) {
  //                 return Math.random() * this._width;
  //               }.bind(this))
  //               .attr('cy', function(d, i) {
  //                 return Math.random() * this._height;
  //               }.bind(this));

  var circle = this._svg.selectAll('.enemies').data(data)
    .transition()
    .duration(750)
    .attr('cx', function(d){
      return d[0][0];
    }).attr('cy', function(d){
      // console.log(d[0][1]);
      return d[0][1];
    });

  this._player.update();

  var playerCx = d3.select('.player').attr('cx');
  var playerCy = d3.select('.player').attr('cy');
  var playerR = d3.select('.player').attr('r');

  var arr = d3.selectAll('.enemies')[0];
  for (var i = 0; i < arr.length; i++){
    var cx = d3.select(arr[i]).attr('cx') - playerCx;
    var cy = d3.select(arr[i]).attr('cy') - playerCy;
    var radiusSum = d3.select(arr[i]).attr('r') + playerR;
    var distance = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));

    if(distance < radiusSum){
      this.gotHit();
    }

    this._score++;
  }
  document.getElementById('cscore').innerHTML = this._score;

};

WatchOut.prototype.gotHit = function(){
  document.getElementById('colscore').innerHTML =  ++this._numCollisions;
  if(this._score > this._highScore){
    this._highScore = this._score;
    document.getElementById('hscore').innerHTML = this._highScore;
  }

  this._score = 0;
}

WatchOut.prototype.run = function() {
  setInterval(this.update.bind(this), 1000);
};

WatchOut.prototype.getScore = function() {
  return this._score;
};

WatchOut.prototype.setScore = function(n) {
  this._score = n;
};

WatchOut.prototype.movePlayer = function(x, y) {
  d3.select('.player').transition().duration(100)
    .attr('cx', x)
    .attr('cy', y);
};


$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var $usernameInput = $('.usernameInput'); // Input for username
  var $loginPage = $('.login.page'); // The login page
  var username;
  // Sets the client's username
  function setUsername () {
    console.log("About to set username");
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      console.log("username is valid");
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  setUsername();
  });
