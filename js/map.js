'use strict';

var NUMBER_OF_ADS = 8;
var OFFER_MIN_PRICE = 1000;
var OFFER_MAX_PRICE = 1000000;
var OFFER_MIN_ROOMS = 1;
var OFFER_MAX_ROOMS = 5;
var OFFER_MIN_GUESTS = 1;
var OFFER_MAX_GUESTS = 10;
var OFFER_DESCRIPTION = '';

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];

var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var roomType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var hotelDetails = [];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adCardPhotosTemplate = document.querySelector('#card').content.querySelector('.popup__photos');
var mapFilters = document.querySelector('.map__filters-container');

var coordinates = {
  x: {min: 300, max: 900},
  y: {min: 130, max: 630}
};

map.classList.remove('map--faded');

// случайное число
function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// случайный элемент массива
function getRandomElemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// перемешивает массив
function shuffleArray(array) {
  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

function getHotelDetails(numberOfAds) {
  var result = [];

  for (var i = 0; i < numberOfAds; i++) {
    var avatarPrefix = i + 1;
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + avatarPrefix + '.png'
      },
      offer: {
        title: getRandomElemFromArray(OFFER_TITLES),
        address: getRandomNumber(coordinates.x.min, coordinates.x.max) + ', ' + getRandomNumber(coordinates.y.min, coordinates.y.max),
        price: getRandomNumber(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
        type: getRandomElemFromArray(OFFER_TYPES),
        rooms: getRandomNumber(OFFER_MIN_ROOMS, OFFER_MAX_ROOMS),
        guests: getRandomNumber(OFFER_MIN_GUESTS, OFFER_MAX_GUESTS),
        checkin: getRandomElemFromArray(OFFER_CHECKIN),
        checkout: getRandomElemFromArray(OFFER_CHECKOUT),
        features: shuffleArray(OFFER_FEATURES),
        discriptions: OFFER_DESCRIPTION,
        photos: shuffleArray(OFFER_PHOTOS)
      },
      location: {
        x: getRandomNumber(coordinates.x.min, coordinates.x.max),
        y: getRandomNumber(coordinates.y.min, coordinates.y.max)
      }
    };
    result.push(obj)
  }

  return result;
}

hotelDetails = getHotelDetails(NUMBER_OF_ADS);

console.log(hotelDetails);

function createPin(offerObject) {
    var pinElementTemplate = pinTemplate.cloneNode(true);
    pinElementTemplate.style.left = offerObject.location.x + 'px';
    pinElementTemplate.style.top = offerObject.location.y + 'px';
    pinElementTemplate.querySelector('img').src = offerObject.author.avatar;
    pinElementTemplate.querySelector('img').alt = offerObject.offer.title;
    return pinElementTemplate;
}

function renderPins(offersArray) {
  var documentFragment = document.createDocumentFragment();
  offersArray.forEach(function (offerItem) {
    var newPin = createPin(offerItem);
    documentFragment.appendChild(newPin);
  });

map.appendChild(documentFragment);
}

function getAdCardFeatures(arr) {
  var newFeature = document.createElement('li');
  newFeature.classList.add('popup__feature');
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var featureItems = newFeature.cloneNode(true);
    featureItems.classList.add('popup__feature--' + arr[i]);
    featureFragment.appendChild(featureItems);
  }
  return featureFragment;
}

function getAdCardPhotos(arr) {
  var adCardPhotosImg = adCardPhotosTemplate.querySelector('.popup__photo');
  var imgFragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var adCardPhotosItems = adCardPhotosImg.cloneNode(true);
    adCardPhotosItems.src = arr[i];
    imgFragment.appendChild(adCardPhotosItems);
  }
  return imgFragment;
};

function createCard(offerObject) {
    var adCardElement = adCardTemplate.cloneNode(true);
    adCardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
    adCardElement.querySelector('.popup__title').textContent = offerObject.offer.title;
    adCardElement.querySelector('.popup__text--address').textContent = offerObject.offer.address;
    adCardElement.querySelector('.popup__text--price').textContent = offerObject.offer.price + '₽/ночь';
    adCardElement.querySelector('.popup__type').textContent = roomType[offerObject.offer.type];
    adCardElement.querySelectorAll('.popup__text--capacity').textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
    adCardElement.querySelectorAll('.popup__text--time').textContent = 'Время заезда в ' + offerObject.offer.checkin + ', выезда ' + offerObject.offer.checkout;
    adCardElement.querySelector('.popup__features').textContent = '';
    adCardElement.querySelector('.popup__features').appendChild(getAdCardFeatures(offerObject.offer.features));
    adCardElement.querySelector('.popup__description').textContent = offerObject.offer.description;
    adCardElement.querySelector('.popup__photos').textContent = '';
    adCardElement.querySelector('.popup__photos').appendChild(getAdCardPhotos(offerObject.offer.photos));
  return adCardElement;
}

function renderCards(offersArray) {
  var documentFragment = document.createDocumentFragment();

  offersArray.forEach(function (offerItem) {
    var newCard = createCard(offerItem);
    documentFragment.appendChild(newCard);
  });
  map.appendChild(documentFragment);
}

renderPins(hotelDetails);
renderCards(hotelDetails)
