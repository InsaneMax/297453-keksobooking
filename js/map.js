'use strict';

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

var offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var coordinates = {
  x: {min: 300, max: 900},
  y: {min: 130, max: 630}
};

var guests = {
  min: 1,
  max: 10
};

var numberPins = 8;
var pinY = 65;
var offer = [];
var offerTitles = titles.slice();

// Вычисление смещения пина из-за его размеров
function pinOffsetX(x) {
  return x + 'px';
}

function pinOffsetY(y) {
  return (y - pinY) + 'px';
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsContainer = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

// случайное число

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// случайный элемент массива

function gerRandomElemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// перемешивание массива

function shuffle(arr) {
  var j;
  var temp;

  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// массив случайной длины
function makeFeatures() {
  var arrAdvantages = features.slice();
  var lengthArrRandom = getRandomNumber(Math.round(arrAdvantages.length / 2), arrAdvantages.length);
  var offerFeatures = [];

  for (var i = 0; i <= lengthArrRandom; i++) {
    var indexRandom = getRandomNumber(0, arrAdvantages.length);
    offerFeatures[i] = arrAdvantages.splice(indexRandom, 1);
  }

  return offerFeatures;
}

// Создадим строку для вставки преимущества
function getStringFeatures(elem) {
  return '<li class="popup__feature popup__feature--' + elem + '"></li>';
}

function generateAds(numberOfItems) {
  var posts = [];
  for (var i = 0; i < numberOfItems; i++) {
    var avatarPrefix = i + 1;
    var locationX = getRandomNumber(coordinates.x.min, coordinates.x.max);
    var locationY = getRandomNumber(coordinates.y.min, coordinates.y.max);

    posts.push({
      author: {
        avatar: 'img/avatars/user0' + avatarPrefix + '.png',
      },
      offer: {
        title: offerTitles.splice(getRandomNumber(0, offerTitles.length), 1),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: gerRandomElemFromArray(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(guests.min, guests.max),
        checkin: gerRandomElemFromArray(times),
        checkout: gerRandomElemFromArray(times),
        features: makeFeatures(),
        description: '',
        photos: shuffle(photos) // все обьекты с одним и тем же порядком фотографий
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return posts;
}

// формирование метки для объекта

function renderPin(pin) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.offer.title;
  mapPinElement.style.left = pinOffsetX(pin.location.x);
  mapPinElement.style.top = pinOffsetY(pin.location.y);
  return mapPinElement;
}

// формирование карточки

function renderCard(offerObject) {
  var mapElement = mapCardTemplate.cloneNode(true);
  var mapCardP = mapElement.querySelectorAll('p');
  var mapCardList = mapElement.querySelector('.popup__features');
  // заголовок объявления
  mapElement.querySelector('.popup__title').textContent = offerObject.offer.title;
  // цена
  mapElement.querySelector('.popup__text--price').innerHTML = offerObject.offer.price + '&#x20bd;/ночь';
  // адрес
  mapElement.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  // тип
  mapElement.querySelector('.popup__type').textContent = offerType[offerObject.offer.type];

  mapElement.querySelector('.popup__photos img').src = offerObject.offer.photos[2];

  // количество гостей
  mapCardP[2].textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
  // время заезда и выезда
  mapCardP[3].textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  // описание
  mapCardP[4].textContent = offerObject.offer.description;
  mapCardList.innerHTML = '';
  mapCardList.insertAdjacentHTML('afterBegin', offerObject.offer.features.map(getStringFeatures).join(' '));
  mapElement.appendChild(mapCardList);

  return mapElement;
}

// Создаем и заполняем данными массив объектов недвижимости
offer = generateAds(numberPins);
// Переносим данные из массива объектов во фрагмент с маркерами для вставки на страницу
offer.forEach(function (elem) {
  fragment.appendChild(renderPin(elem));
});

// Добавляем маркеры на страницу
pinsContainer.appendChild(fragment);
// Создаем новый пустой фрагмент
fragment = document.createDocumentFragment();
// Заполняем фрагмент данными из массива объектов для отрисовки первой карточки недвижимости
fragment.appendChild(renderCard(offer[0]));
// Добавляем карточку недвижимости на страницу
map.appendChild(fragment);
