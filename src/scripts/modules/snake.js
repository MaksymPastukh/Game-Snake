export class Snake {
  // Стандартное направление
  currentDirection = 'right'
  // Набор позиций точек из которых состоит змейка
  snake = [
    {
      x: 10,
      y: 20,
    }
  ]

  // Глобальные переменные в классе
  context = null
  positionCount = null
  positionSize = null

  constructor(context, positionCount, positionSize) {
    this.context = context
    this.positionCount = positionCount
    this.positionSize = positionSize


    this.addKeyboardHandler()
  }


  // Метод отработки нажатия на клавиатуру
  addKeyboardHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && this.currentDirection !== 'right') {
        this.currentDirection = 'left'
      } else if (e.key === 'ArrowRight' && this.currentDirection !== 'left') {
        this.currentDirection = 'right'
      } else if (e.key === 'ArrowUp' && this.currentDirection !== 'down') {
        this.currentDirection = 'up'
      } else if (e.key === 'ArrowDown' && this.currentDirection !== 'up') {
        this.currentDirection = 'down'
      }
    })
  }

  showSnake(foodPosition) {

    let result = {
      gotFood: false,
      collision: false
    }

    for (let i = 0; i < this.snake.length; i++) {
      // Цвет
      this.context.fillStyle = 'black'
      // Начинаем рисовать
      this.context.beginPath()
      // Рисуем квадрат ( В параметры указываем размеры квадрата)
      this.context.fillRect(this.snake[i].x * this.positionSize - this.positionSize,
        this.snake[i].y * this.positionSize - this.positionSize, this.positionSize, this.positionSize)
    }

    // Сохраняем последние точки перемещения
    let newHeadPosition = {
      x: this.snake[0].x,
      y: this.snake[0].y,
    }

    // Удаляем последний элемент только в том случае если мы не сьели еду
    if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
      // Указываем что мы сьели еду
      result.gotFood = true;
    } else {
      // Удаляем последний элемент из массива
      this.snake.pop()
    }


    // Управление направлением
    if (this.currentDirection === 'left') {
      if (newHeadPosition.x === 1) {
        newHeadPosition.x = this.positionCount
      } else {
        newHeadPosition.x -= 1;
      }
    } else if (this.currentDirection === 'right') {
      if (newHeadPosition.x === this.positionCount) {
        newHeadPosition.x = 1
      } else {
        newHeadPosition.x += 1;
      }
    } else if (this.currentDirection === 'up') {
      if (newHeadPosition.y === 1) {
        newHeadPosition.y = this.positionCount
      } else {
        newHeadPosition.y -= 1
      }
    } else if (this.currentDirection === 'down') {
      if (newHeadPosition.y === this.positionCount) {
        newHeadPosition.y = 1
      } else {
        newHeadPosition.y += 1
      }
    }

    if(!this.checkNewHeadPositionForCollision(newHeadPosition)) {
      // Добавляем элемент в начало массива
      this.snake.unshift(newHeadPosition)
    } else  {
      result.collision = true
    }

    return result
  }

  checkNewHeadPositionForCollision(newHeadPosition) {
    for (let i = 0; i < this.snake.length; i++) {
      if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) return true
    }
    return false
  }
}