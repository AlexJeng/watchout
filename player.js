var Player = function(xpos, ypos, id, color) {
  this._id = id;
  // console.log("this._id at creation" + this._id);
  // console.log("id at creation " + id);
  this._color = color;
  // console.log('COLOR: ' + this._color);
  this._size = 6;
  this._xpos = xpos;
  this._ypos = ypos;

  this.init();
};

Player.prototype.init = function() {
  var width = 400;
  var height = 800; //quit hard coding you slacker
  var radius = this._size;
  var svg = d3.select('svg');
  var id = this._id;
  var drag = d3.behavior.drag()
    .on('drag', function(d) {
      // console.log('drag');
      var x = Math.max(radius, Math.min(width - radius, d3.event.x));
      var y = Math.max(radius, Math.min(height - radius, d3.event.y));
        d3.selectAll('.player').filter('.'+this._id)
          .attr('cx', x)
          .attr('cy', y);
          // console.log('socket: ' + socket);
          // console.log("this players id " + id);
          socket.emit('movedPlayer', [id, x,y]);
          // console.log(x + ", " + y);
    });
  svg.append('circle')
      .attr('cx', this._xpos)
      .attr('cy', this._ypos)
      .attr('r', this._size)
      .attr('class', 'player ' + id)
      .attr('fill', this._color)
      .call(drag);


};

Player.prototype.update = function(data) {
};
