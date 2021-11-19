ymaps.ready(init);

function init() {
     var location = ymaps.geolocation;
var myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10
}, {
    searchControlProvider: 'yandex#search'
});

// Получение местоположения и автоматическое отображение его на карте.
location.get({
        mapStateAutoApply: true
    })
.then(
    function(result) {
        // Получение местоположения пользователя.
        var userAddress = result.geoObjects.get(0).properties.get('text');
        var userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
        result.geoObjects.options.set('preset', 'islands#blackStretchyIcon');
        result.geoObjects.options.set('draggable', 'true');
        // Пропишем полученный адрес в балуне.
        result.geoObjects.get(0).properties.set({
            type: "Point",
            iconContent: 'Помогите',
            hintContent: 'SOS',
            balloonContentBody: 'Начальный адрес: ' + userAddress +
                                '<br/>Начальные координаты:' + userCoodinates
    });
        myMap.geoObjects.add(result.geoObjects)
    },
    function(err) {
        console.log('Ошибка: ' + err)
    }
);
}


ymaps.ready(init);

function init() {
     var location = ymaps.geolocation;
var myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10
}, {
    searchControlProvider: 'yandex#search'
});

     // Получение местоположения и автоматическое отображение его на карте.
location.get({
        mapStateAutoApply: true
    })
.then(
    function(result) {
        // Получение местоположения пользователя.
        var userAddress = result.geoObjects.get(0).properties.get('text');
        var userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
        result.geoObjects.options.set('preset', 'islands#blackStretchyIcon');
        result.geoObjects.options.set('draggable', 'true');
        // Пропишем полученный адрес в балуне.
        result.geoObjects.get(0).properties.set({
            type: "Point",
            iconContent: 'Помогите',
            hintContent: 'SOS',
            balloonContentBody: 'Начальный адрес: ' + userAddress +
                                '<br/>Начальные координаты:' + userCoodinates
    });
        myMap.geoObjects.add(result.geoObjects)
    },
    function(err) {
        console.log('Ошибка: ' + err)
    }
);
     // Контекстное меню, позволяющее изменить параметры метки.
    // Вызывается при нажатии правой кнопкой мыши на метке.
    myPlacemark.events.add('contextmenu', function (e) {
        // Если меню метки уже отображено, то убираем его.
        if ($('#menu').css('display') == 'block') {
            $('#menu').remove();
        } else {
            // HTML-содержимое контекстного меню.
            var menuContent =
                '<div id="menu">\
                    <ul id="menu_list">\
                        <li>Название: <br /> <input type="text" name="icon_text" /></li>\
                        <li>Подсказка: <br /> <input type="text" name="hint_text" /></li>\
                        <li>Балун: <br /> <input type="text" name="balloon_text" /></li>\
                    </ul>\
                <div align="center"><input type="submit" value="Сохранить" /></div>\
                </div>';

            // Размещаем контекстное меню на странице
            $('body').append(menuContent);

            // Задаем позицию меню.
            $('#menu').css({
                left: e.get('pagePixels')[0],
                top: e.get('pagePixels')[1]
            });

            // Заполняем поля контекстного меню текущими значениями свойств метки.
            $('#menu input[name="icon_text"]').val(myPlacemark.properties.get('iconContent'));
            $('#menu input[name="hint_text"]').val(myPlacemark.properties.get('hintContent'));
            $('#menu input[name="balloon_text"]').val(myPlacemark.properties.get('balloonContent'));

            // При нажатии на кнопку "Сохранить" изменяем свойства метки
            // значениями, введенными в форме контекстного меню.
            $('#menu input[type="submit"]').click(function () {
                myPlacemark.properties.set({
                    iconContent: $('input[name="icon_text"]').val(),
                    hintContent: $('input[name="hint_text"]').val(),
                    balloonContent: $('input[name="balloon_text"]').val()
                });
                // Удаляем контекстное меню.
                $('#menu').remove();
            });
        }
    });

    myMap.geoObjects.add(myPlacemark);
}
