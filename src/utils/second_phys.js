function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
export default class dvd {
    constructor(width, imgHeight, x, y) {
        this.speed = 0
        this.acceleration = 0.001 * getRandomInt(5)

        this.changeX = 1 * [1, -1][Math.floor(2 * Math.random())]
        this.changeY = 1 * [1, -1][Math.floor(2 * Math.random())]

        this.posX = x
        this.posY = y

        this.width = width
        this.imgHeight = imgHeight
    }

    update(maxX, maxY) {
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

        this.speed += this.acceleration

        return {
            x: this.posX,
            y: this.posY
        }
    }
}