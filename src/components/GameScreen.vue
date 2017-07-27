<template>
  <div>
    <p>{{msg}}</p>
    <canvas ref="cnvs"></canvas>
    <snake v-for="p in players" :key="p.name" :keys="p.controls" :name="p.name" :color="p.color" :ctx="ctx" ref="snakes"></snake>
    <!-- <snake :keys="keyMaps.keySet1" name="Snake1" color="red" :ctx="ctx" ref="snake1"></snake>
    <snake :keys="keyMaps.keySet2" name="Snake2" color="blue" :ctx="ctx" ref="snake2"></snake> -->
  </div>
</template>


<script>
import EventBus from '../modules/EventsBus'
import KeyMaps from '../modules/KeyMaps'
import defaults from '../modules/Defaults'
import store from '../vuexstore/store'
import snake from './Snake'

export default {
  components: {
    snake: snake
  },
  data() {
    return {
      msg: 'Snake Pong',
      keyMaps: KeyMaps,
      ctx: undefined,
      timer: undefined,
      tickNum: 0,
      foodMovement: { x: 1, y: 1 },
      players: [
        {name: 'snake1', color: 'red', controls: KeyMaps.keySet1},
        {name: 'snake2', color: 'blue', controls: KeyMaps.keySet2}
      ]
    }
  },
  mounted: function () {
    // get 2D rendering context
    let cnvs = this.$refs.cnvs;
    this.ctx = cnvs.getContext("2d");
    cnvs.height = defaults.gridHeight * defaults.gridScale;
    cnvs.width = defaults.gridWidth * defaults.gridScale;

    // draw canvas
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, cnvs.width, cnvs.height);
    this.timer = setInterval(this.gameLoop, defaults.tickSpeed);
  },
  methods: {
    drawFood: function () {

      let foodLocation = store.state.foodLocation;

      this.ctx.fillStyle = "rgba(255,255,0,0.8)";
      this.ctx.fillRect(defaults.gridScale * foodLocation.x, defaults.gridScale * foodLocation.y, defaults.gridScale, defaults.gridScale);

      if (foodLocation.x + this.foodMovement.x < 0)
        this.foodMovement.x = 1;

      if (foodLocation.x + this.foodMovement.x > defaults.gridWidth)
        this.foodMovement.x = -1;

      if (foodLocation.y + this.foodMovement.y < 0)
        this.foodMovement.y = 1;

      if (foodLocation.y + this.foodMovement.y > defaults.gridHeight)
        this.foodMovement.y = -1;

      if (this.tickNum % 6 === 0) {
        foodLocation.x += this.foodMovement.x;
        foodLocation.y += this.foodMovement.y;
      }
    },
    gameLoop: function () {

      // draw canvas
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      this.ctx.fillRect(0, 0, this.$refs.cnvs.width, this.$refs.cnvs.height);
      this.drawFood();
      for(let i=0;i<this.$refs.snakes.length;i++){
        this.$refs.snakes[i].move();
      }
      //this.$refs.snake2[0].move();
      this.tickNum++;


      this.ctx.fillStyle = "white";
      this.ctx.font = "20px monospace";
      this.ctx.fillText("Snake Pong", 10, 20);

      this.ctx.font = "12px Arial";
      this.ctx.fillText("By @ w o n g m j a n e", 10, this.$refs.cnvs.height - 30);

      this.ctx.font = "12px Arial";
      this.ctx.fillText("vue-ified By @ M r C l a n", 10, this.$refs.cnvs.height - 5);
    }
  }
}
</script>
<style>
canvas {
  margin: 20px;
  border: 1px #aaa solid;
}
</style>