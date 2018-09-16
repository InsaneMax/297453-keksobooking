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

var photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var coordinates = {
  x: {min: 300, max: 900},
  y: {min: 130, max: 630}
};

var guests = {
  min: 1,
  max: 10
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsContainer = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();


//случайное число

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//случайный элемент массива

function gerRandomElemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//перемешивание массива

function shuffle(arr){
  var j, temp;
  for(var i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

//массив случайной длины

 var makeFeatures = function () {
    var arrAdvantages = features.slice();
    var lengthArrRandom = getRandomNumber(Math.round(arrAdvantages.length / 2), arrAdvantages.length);
    var offerFeatures = [];

    for (var i = 0; i <= lengthArrRandom; i++) {
      var indexRandom = getRandomNumber(0, arrAdvantages.length);
      offerFeatures[i] = arrAdvantages.splice(indexRandom, 1);
    }

    return offerFeatures;
  };

function generateAds(numberOfItems) {
  var posts = [];
  for (var i = 0; i < numberOfItems; i++) {
    var avatarPrefix = i + 1;
    var locationX = getRandomNumber(coordinates.x.min, coordinates.x.max);
    var locationY = getRandomNumber(coordinates.y.min, coordinates.y.max);

    posts.push({
      author: {
        avatar: 'img/avatar/user0' + avatarPrefix + '.png',
      },
      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: gerRandomElemFromArray(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(guests.min, guests.max),
        checkin: gerRandomElemFromArray(times),
        checkout: gerRandomElemFromArray(times),
        features: makeFeatures(),
        description: '',
        photos: shuffle(photos) //все обьекты с одним и тем же порядком фотографий
      },
      location: {
        x: locationX,
        y: locationY
      }
    })
  }
  return posts;
}

// формирование метки для объекта

function generatePin(pin) {
  mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = pin.author.avatar;
  mapPinElement.querySelector('img').alt = pin.author.title;
  mapPinElement.style.left = pin.location.x +'px';
  mapPinElement.style.top = pin.location.y + 'px';
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
  };
