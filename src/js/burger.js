const burger = () => {
    const burgerBtn = $('.burg-btn');
    const modalBurger = $('.burger-menu');
    // const toggleImg = $('.header__menu-img');
    const closeImg = $('.header__btn-close');

    burgerBtn.on('click', function() {  // открывает окно и закрывает
        modalBurger.fadeToggle(500);
        if(window.screen.width <= 480) {
            burgerBtn.hide();
            closeImg.show();
            // closeImg.show();
            // burgerBtn.hide();
        } else if(window.screen.width > 479) {
            burgerBtn.show();
            closeImg.hide();
        }
    });
    closeImg.on('click', function() {
        // modalBurger.fadeToggle(500);
        if(window.screen.width <= 480) {
            closeImg.hide();
            burgerBtn.show();
            
        } 
        // else if(window.screen.width > 479) {
        //     closeImg.show();
        //     burgerBtn.hide();
        // }
    })

    $('.burger__link').on('click', function() {
        modalBurger.hide();
        if(window.screen.width <= 480) {
            burgerBtn.show();
            closeImg.hide();
          
        } 
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
