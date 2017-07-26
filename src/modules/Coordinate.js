function Coordinate(x, y) {
  this.x = x;
  this.y = y;
}

Coordinate.prototype.equals = function(c) {
  return this.x === c.x && this.y === c.y;
};


export default Coordinate;
