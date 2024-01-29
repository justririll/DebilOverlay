<template>
    <div id="bouncingEmote">
        <img :src="Url">
    </div>
</template>

<script>
import dvd from '@/utils/dvd_phys.js'
import p2 from '@/utils/second_phys.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  name: 'BouncingEmote',

  data() {
    return {
        imgPhys: undefined,

        interval: undefined,
        imgHeight: 96,

        posX: 0,
        posY: 0,

        imgPos: { //@TODO: сделать рандом
            x: 0,
            y: 0
        }
    }
  },

  props: {
    Url: String,
    width: Number,
  },

  mounted() {
    if (Math.floor(2 * Math.random()) == 1) {
      this.imgPhys = new p2(this.width, this.imgHeight, getRandomInt(window.innerWidth-100), getRandomInt(window.innerHeight-100))
    } else {
      this.imgPhys = new dvd(this.width, this.imgHeight, 1, getRandomInt(window.innerWidth-100), getRandomInt(window.innerHeight-100))
    }


    this.interval = setInterval(this.update, 4)
  },

  methods: {
    update() {
      let imgPos = this.imgPhys.update(window.innerWidth, window.innerHeight)
      this.posX = imgPos.x
      this.posY = imgPos.y
    }
  },

  computed: {
    position() {
        return `translate(${this.imgPos.x}px, ${this.imgPos.y}px)`
    },
    x() {
        return `${this.posX}px`
    },
    y() {
        return `${this.posY}px`
    }

  }
}
</script>

<style>
    div #bouncingEmote {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        background: none;
        left: v-bind("x");
        top: v-bind("y");
        position: absolute;
    }
</style>