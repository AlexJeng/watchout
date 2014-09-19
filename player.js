var Player = function(xpos, ypos) {
  this._color = 'pink';
  this._size = 6;
  this._xpos = xpos;
  this._ypos = ypos;
  this.init();
};

Player.prototype.init = function() {
  var width = this._xpos * 2;
  var height = this._ypos * 2;
  var radius = this._size;
  var svg = d3.select('svg');
  var drag = d3.behavior.drag()
    .on('drag', function(d) {
        d3.select('.player')
          .attr('cx', Math.max(radius, Math.min(width - radius, d3.event.x)))
          .attr('cy', Math.max(radius, Math.min(height - radius, d3.event.y)));
    });
  svg.append('circle')
      .attr('cx', this._xpos)
      .attr('cy', this._ypos)
      .attr('r', this._size)
      .attr('class', 'player')
      .attr('fill', this._color)
      .call(drag);

};

Player.prototype.update = function(data) {
  console.log('LOGGGGGG');
};
