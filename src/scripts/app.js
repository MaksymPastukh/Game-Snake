import {Game} from "./modules/game.js";

class App {

  // Объект настроек, positionCount - количество позиций в сетки. positionSize - размер позиции в сетки в px
  setting = {
    positionCount: 30,
    positionSize: 20
  }
  constructor() {
    // Создаем элемент канвас на котором будет обрисовываться игра
    const canvas = document.createElement('canvas')
    // Ширина сетки
    canvas.setAttribute('width', (this.setting.positionCount * this.setting.positionSize).toString())
    // Высота сетки
    canvas.setAttribute('height', (this.setting.positionCount * this.setting.positionSize).toString())
    // Добавляем сетки в контейнер на страницу
    document.getElementById('container').appendChild(canvas)


    // Специальная переменная для работы с конвасом
    const context = canvas.getContext('2d')

    // Запускаем игру (передаем в модуль игры контекст и настройки сетки)
    new Game(context, this.setting)
  }

}

(new App())