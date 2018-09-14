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

console.log(generateAds(5));

