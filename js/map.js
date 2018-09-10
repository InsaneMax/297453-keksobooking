var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var times = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

//случайное число

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//случайный элемент из массива

function gerRandomElemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

console.log(gerRandomElemFromArray(titles));
