const form = () => {
    const formSubtitle = $('.form__subtitle'); // нашли заголовок в форме
    const modalForm = document.querySelector('.form__form-input'); 

    $('.form-field__input-num').focus( () => { // при фокусе на поле меняем текст
        formSubtitle
        .text(`Введите ваш телефон`)
    })

    $('.form-field__input-mail').focus( () => { // при фокусе на поле меняем текст
        formSubtitle
        .text(`Введите ваш e-mail`)
    })

    $('.form__inp').blur( () => { // отводим от инпута после фокуса и меняется текст чтобы заполнил форму
        formSubtitle.text('Заполните форму');
    })

    // работа с формой
    
    $('.form__form-input').submit(function (event) {
        event.preventDefault();
        
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            type: 'POST',
            data: $(this).serialize(),
            success(data) {
                formSubtitle.text('Спасибо ваша заявка принята, номер заявки ' + data.id)
                modalForm.reset();
            }, 
            error() {
                formSubtitle.text('Что то пошло не так, попробуйте позже!')
            } 
        })
        
    });


};

form();

// const swiper = () => {
//     const swiper = new Swiper('.swiper1', {
//         // Optional parameters
//         direction: 'vertical',
//         loop: true,
      
//         // If we need pagination
//         pagination: {
//           el: '.swiper-pagination',
//         },
      
//         // Navigation arrows
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
      
//         // And if we need scrollbar
//         scrollbar: {
//           el: '.swiper-scrollbar',
//         },
//       });
//     const sliderAll = () => {
//         const swiper1 = new Swiper('.swiper1', {
//             slidesPerView: 1,
//         });  
        
//         const swiper2 = new Swiper('.swiper2', {
//             slidesPerView: 1,
//         });  
//     };
    

// }
// swiper();

const maps = () => {

    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("map", {
            center: [55.849206, 37.375674],
            zoom: 12
        });

        const mark = new ymaps.Placemark([55.849206, 37.375674], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/footermaps.svg',
            iconImageSize: [39, 59],
            iconImageOffset: [-33, -59]
        })

        myMap.geoObjects.add(mark)

        myMap.behaviors.disable('scrollZoom'); // запрещает зум карты колесиком мыши
        myMap.behaviors.disable('drag'); // запрещает скролл свайпом
            
        myMap.controls.remove('rulerControl'); // удаляет контрол правила
        myMap.controls.remove('zoomControl'); // удаляет контроль зумирования
        myMap.controls.remove('fullscreenControl'); // удаляет переход в полноэкранный режим
        myMap.controls.remove('typeSelector'); // удаляет тип
        myMap.controls.remove('trafficControl'); // удаляет контроль трафика
        myMap.controls.remove('searchControl'); // удаляет поиск
        myMap.controls.remove('geolocationControl'); // удаляет геолокацию местоположение
    }

}
maps();

const safari = () => {
    document.addEventListener('click', event => {
        if (event.target.matches('button')) {
            event.target.focus()
        }
        })
};
safari();

const scroll = () => {

    let $page = $('html, body'); // для плавного скролла по якорям
    $('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
    });

};
scroll();

const maskOne = () => {
    const inputMaskTel = document.querySelector('.form-field__maska'); // нашел сам инпут телефон другой класс
    const telMask = new Inputmask('+7 (999)-999-99-99'); // на инпут сделал маску для номера 
    telMask.mask(inputMaskTel);
};
maskOne();

const maskTwo = () => {
    const mask = document.querySelector('.form-field__mask-two'); // нашел сам инпут телефон другой класс
    const numberMask = new Inputmask('+7 (999)-999-99-99'); // на инпут сделал маску для номера 
    numberMask.mask(mask);
};
maskTwo();



const pets = () => {
    const swiper = new Swiper('.swiper', {
        slidePerView: 1,
		loop: true,
        // autoHeight: true,
        // slidesPerView: 1,
        // centeredSlides: true,
        // centerInsufficientSlides: true,
        navigation: {
            nextEl: '.button-right',
            prevEl: '.button-left',
        },
        mousewheel: true,
		keyboard: true,
    });  
};

const reload = () => {
    // const initSlider1 = document.querySelector('.swiper');
    // if ( window.screen.width > 768) location.reload();
};

window.addEventListener('DOMContentLoaded', () => {
    if (window.screen.width <= 768) pets();
});

window.addEventListener('resize', () => {
    if (window.screen.width <= 768) pets();
});