<template>
    <div id="bouncingEmote">
        <img :src="Url">
    </div>
</template>

<script>

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  name: 'BouncingEmote',

  data() {
    return {
        maxX: 0,
        maxY: 0,

        interval: undefined,
        posX: getRandomInt(window.innerWidth-100),
        posY: getRandomInt(window.innerHeight-100),
        speed: 2,
        changeX: 1,
        changeY: 1,
        imgHeight: 96,

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
    this.imgPos = {
            x: this.posX,
            y: this.posY
    }
    this.interval = setInterval(this.update, 4)
  },

  methods: {
    update() {
        let maxX = window.innerWidth
        let maxY = window.innerHeight
        this.maxX = maxX
        this.maxY = maxY

        this.posX += this.speed * this.changeX
        this.posY += this.speed * this.changeY

        let isRight = this.posX >= (maxX - this.width)
        let isBottom = this.posY >= (maxY - this.imgHeight)
        let isTop = this.posY <= 0
        let isLeft = this.posX <= this.width

        if (isLeft || isRight) {
            this.changeX *= -1
        }
        if (isBottom || isTop) {
            this.changeY *= -1
        }

        this.imgPos = {
            x: this.posX,
            y: this.posY
        }
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