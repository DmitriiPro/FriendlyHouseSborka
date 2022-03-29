const burger = () => {
    const burgerBtn = $('.burg-btn');
    const modalBurger = $('.burger-menu');

    burgerBtn.on('click', function() {  // открывает окно и закрывает
        modalBurger.fadeToggle(500);
    });

    $('.burger__link').on('click', function() {
        modalBurger.hide();
    }); // при клике по ссылке закрывается бургер меню

    // burgerBtn.on('click', function() {  // открывает окно и закрывает
    //     modalBurger.show(500);
    // });
    // burgerBtn.on('click', function() {  // открывает окно и закрывает
    //     modalBurger.hide(500);
    // });

    
    $(document).mouseup(function(e) {  // при нажатии не на кнопку закрывает бургер
        var $target = $(e.target);
        if ($target.closest(modalBurger).length == 0 && $target.closest(burgerBtn).length == 0) {
            modalBurger.hide();
        }
    });

};

burger();
