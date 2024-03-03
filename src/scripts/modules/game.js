import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
  snake = null
  food = null
  context = null
  positionCount = null
  positionSize = null
  score = null
  scoreElement = null
  interval = null

  // Принимаем в параметры с app
  constructor(context, settings) {
    this.context = context
    this.positionCount = settings.positionCount
    this.positionSize = settings.positionSize

    this.scoreElement = document.getElementById('score')

    // Подключаем кнопку начала игры
    document.getElementById('start').onclick = () => {
      // Запускаем игру
      this.startGame()

    }
  }

  startGame() {
    if(this.interval) {
      clearInterval(this.interval)

    }

    if (this.score) {
      this.scoreElement.innerText = 0
    }

    // Создаем экземпляр класса еды
    this.food = new Food(this.context, this.positionCount, this.positionSize)
    // Создаем экземпляр класса змейки
    this.snake = new Snake(this.context, this.positionCount, this.positionSize)
    // Вызов метода для рандомного размещения еды
    this.food.setNewFoodPosition()
    // Запускаем функционал сетки, змейки и еды через каждую 1 секунду
    this.interval =  setInterval(this.gameProcess.bind(this), 100)
  }

  // Метод для отрисовки сетки, змейки и еды
  gameProcess() {
    // Очищаем наш канвас и заново его рисовать
    this.context.clearRect(0, 0, this.positionCount * this.positionSize, this.positionCount * this.positionSize)
    // Рисуем грид сетку
    // this.showGrid()
    // Рисуем еду
    this.food.showFood()
    // Рисуем змейку

    let result = this.snake.showSnake(this.food.foodPosition)

    if (result) {
      if(result.collision) {
        this.endGame()
        this.score.innerText = 0

      } else if(result.gotFood) {
        this.score += 1
        this.scoreElement.innerText = this.score
        this.food.setNewFoodPosition()
      }
    }
  }

  endGame () {
      clearInterval(this.interval)

    this.context.fillStyle = 'black'
    this.context.font = 'bold 48px Arial'
    this.context.textAling = 'center'
    this.context.fillText(`Earn ${this.score} points`,
      (this.positionCount * this.positionSize) / 3,
      (this.positionCount * this.positionSize) / 2)
  }

  // Отрисовка грид сетки по которой будет двигаться змейка
  showGrid() {
    // Сохраняем значение размера
    const size = this.positionCount * this.positionSize

    // Отрисовка вертикали
    for (let i = 0; i <= size; i += this.positionSize) {
      this.context.moveTo(0.5 + i + this.positionSize, 0)
      this.context.lineTo(0.5 + i + this.positionSize, size + this.positionSize)
    }

    // Отрисовка по горизонтали
    for (let i = 0; i <= size; i += this.positionSize) {
      this.context.moveTo(0, 0.5 + i + this.positionSize)
      this.context.lineTo(size + this.positionSize, 0.5 + i + this.positionSize)
    }

    this.context.strokeStyle = 'black'
    this.context.stroke()
  }
}


