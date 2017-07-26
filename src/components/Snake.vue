<template>
  <h4 :style="{color:color}">
    {{name}} : {{score}}</h4>
</template>

<script>
import EventBus from '../modules/EventsBus';
import Coordinate from '../modules/Coordinate';
import defaults from '../modules/Defaults';
import store from '../vuexstore/store';

export default {
  props: {
    "ctx": {},
    "name": String,
    "color": String,
    "keys": {
      type: Object,
      required: true,
      validator: function (keyMap) {
        return keyMap.LEFT && keyMap.UP && keyMap.RIGHT && keyMap.DOWN;
      }
    }
  },
  data() {
    return {
      snakeBody: [],
      snakeLength: 3,
      score: 0,
      direction: undefined
    };
  },
  mounted: function () {
    EventBus.GlobalEventsBus.$on("globalKeyPress", this.captureDirection);
    this.direction = this.keys.RIGHT;
    this.snakeBody.push(new Coordinate(Math.round(defaults.gridWidth / 2), Math.round(defaults.gridHeight / 2)));
  },
  methods: {
    captureDirection: function (ev) {
      if (ev.keyCode === this.keys.LEFT && this.direction !== this.keys.RIGHT ||
        ev.keyCode === this.keys.RIGHT && this.direction !== this.keys.LEFT ||
        ev.keyCode === this.keys.UP && this.direction !== this.keys.DOWN ||
        ev.keyCode === this.keys.DOWN && this.direction !== this.keys.UP) {
        this.direction = ev.keyCode;
      }
    },
    move: function () {
      let foodLocation = store.state.foodLocation;
      this.snakeBody.push(new Coordinate(
        this.snakeBody[this.snakeBody.length - 1].x + (this.direction === this.keys.RIGHT ? 1 : this.direction === this.keys.LEFT ? -1 : 0),
        this.snakeBody[this.snakeBody.length - 1].y + (this.direction === this.keys.DOWN ? 1 : this.direction === this.keys.UP ? -1 : 0)
      ));

      if (this.snakeBody.length > this.snakeLength)
        this.snakeBody.shift();

      if (this.snakeBody[this.snakeBody.length - 1].x < 0)
        this.snakeBody[this.snakeBody.length - 1].x = defaults.gridWidth - 1;

      if (this.snakeBody[this.snakeBody.length - 1].x > defaults.gridWidth)
        this.snakeBody[this.snakeBody.length - 1].x = 0;

      if (this.snakeBody[this.snakeBody.length - 1].y < 0)
        this.snakeBody[this.snakeBody.length - 1].y = defaults.gridHeight - 1;

      if (this.snakeBody[this.snakeBody.length - 1].y > defaults.gridHeight)
        this.snakeBody[this.snakeBody.length - 1].y = 0;

      for (var i = 0; i < this.snakeBody.length - 1; i++) {
        if (this.snakeBody[i].x === this.snakeBody[this.snakeBody.length - 1].x &&
          this.snakeBody[i].y === this.snakeBody[this.snakeBody.length - 1].y) {
          this.snakeBody = [this.snakeBody[this.snakeBody.length - 1]];
        }
      }

      if (this.snakeBody[this.snakeBody.length - 1].x === foodLocation.x &&
        this.snakeBody[this.snakeBody.length - 1].y === foodLocation.y) {
        store.commit('newFoodLocation');
        this.snakeLength++;
        this.score++;
      }


      this.ctx.fillStyle = this.color;
      for (i = 0; i < this.snakeBody.length; i++) {
        this.ctx.fillRect(defaults.gridScale * this.snakeBody[i].x, defaults.gridScale * this.snakeBody[i].y, defaults.gridScale, defaults.gridScale);
        this.ctx.strokeRect(defaults.gridScale * this.snakeBody[i].x, defaults.gridScale * this.snakeBody[i].y, defaults.gridScale, defaults.gridScale);
      }
      this.ctx.fillRect(defaults.gridScale * this.snakeBody[this.snakeBody.length - 1].x, defaults.gridScale * this.snakeBody[this.snakeBody.length - 1].y, defaults.gridScale, defaults.gridScale);
    }
  }
}
</script>