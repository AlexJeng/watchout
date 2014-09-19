var WatchOut = function() {
  this._score = 0;
  this._height = 400;
  this._width = 800;
  this._enemies = 20;
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
  var circle = this._svg.selectAll('.enemies')
                .transition()
                .duration(750)
                .attr('cx', function(d, i) {
                  return Math.random() * this._width;
                }.bind(this))
                .attr('cy', function(d, i) {
                  return Math.random() * this._height;
                }.bind(this));
  this._player.update();
};

WatchOut.prototype.run = function() {
  setInterval(this.update.bind(this), 1000);
};

WatchOut.prototype.getScore = function() {
  return this._score;
};

WatchOut.prototype.setScore = function(n) {
  this._score = n;
};


