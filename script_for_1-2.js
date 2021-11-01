'use strict'

alert('Задание №1');
let Tc = +prompt('Введите температуру в градусах Цельсия: ');
let Tf = (9 / 5) * Tc + 32;
alert(`Температура в градусах по Фаренгейту: ${Tf}`);

alert('Задание №2');
let name = null;
let admin = null;
name = 'Василий';
admin = name;
alert(`admin: ${admin}`)
