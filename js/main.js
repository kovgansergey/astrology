'use strict';

// функция закрытия модального окна
function closePopup(event) {
  const target = event.target,
    popup = target.closest('.popup');

  if (target.closest('.popup__close') || !target.closest('.popup__dialog')) {
    popup.classList.remove('active');
    document.querySelector('body').style.overflow = '';
    popup.removeEventListener('click', closePopup);
  }
}

// открытие модального окна Заказать звонок
const phoneCall = document.querySelector('.phone-call'),
  recallPopup = document.querySelector('.recall-popup'),
  orderPopup = document.querySelector('.order-popup');

phoneCall.addEventListener('click', event => {
  event.preventDefault();
  recallPopup.classList.add('active');
  document.querySelector('body').style.overflow = 'hidden';
  recallPopup.addEventListener('click', closePopup);
});

// скрипт аккордеона в секции Консультации
const accordeon = document.querySelector('.consultation-accordeon'),
  accordeonPanels = accordeon.querySelectorAll('.consultation-panel');

function togglePanel(button) {
  const panel = button.closest('.consultation-panel'),
    arrow = button.querySelector('.arrow');

    function closePanels() {
      accordeonPanels.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.arrow').classList.remove('active');
      });
    }

    function openPanelAnimate(panel) {
      let coin = 145;
      const stop = panel.clientHeight;

      requestAnimationFrame(function openPanelAnim() {
        panel.style.height = coin + 'px';

        if (coin < stop) {
          coin += 15;
          requestAnimationFrame(openPanelAnim);
        } else {
          panel.style.height = '';
        }
      });
    }

    if (panel.classList.contains('active')) {
      panel.classList.remove('active');
      arrow.classList.remove('active');
    } else {
      closePanels();
      panel.classList.add('active');
      arrow.classList.add('active');
      openPanelAnimate(panel);
    }
}

// открытие модального окна Оформить заказ с подстановкой названия и цены
function openOrderPopup(banner) {
  const bannerCourseName = banner.querySelector('.course-name'),
    bannerCourseCost = banner.querySelector('.course-cost'),
    formOrderName = orderPopup.querySelector('.form__order-name'),
    formOrderCost = orderPopup.querySelector('.form__order-cost');

  formOrderName.value = bannerCourseName.textContent;
  formOrderCost.value = bannerCourseCost.textContent;
  orderPopup.classList.add('active');
  document.querySelector('body').style.overflow = 'hidden';
  orderPopup.addEventListener('click', closePopup);
}

accordeon.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.consultation-panel__btn')) {
    togglePanel(target.closest('.consultation-panel__btn'));
  }

  if (target.closest('.banner__btn')) {
    openOrderPopup(target.closest('.banner'));
  }
});

// слайдер с отзывами Видео
var videoSwiper = new Swiper('.comments__video-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 26
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 60
    }
  }
});

// слайдеры с отзывами Инстаграм
// первый слайдер с пользователями
var instaUserSwiper = new Swiper('.comments__instagram-user-swiper', {
  slidesPerView: 'auto',
  loop: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.comments__instagram-next',
    prevEl: '.comments__instagram-prev'
  }
});
// второй слайдер с текстом отзывов
var instaCommentSwiper = new Swiper('.comments__instagram-comment-swiper');
// синхронизация второго слайдера с первым
instaUserSwiper.on('slideChange', () => {
  instaCommentSwiper.slideTo(instaUserSwiper.realIndex);
});

// открытие-закрытие подробного онлайн курса
const courses = document.querySelector('.courses');

courses.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.detail-btn')) {
    target.closest('.courses-item').querySelector('.courses-card-detail').style.display = 'block';
  }

  if (target.closest('.close-btn') || target.closest('.courses-card-detail__bg')) {
    target.closest('.courses-card-detail').style.display = '';
  }
});

// таймер будущих онлайн курсов
function countTimer(selector, deadline) {
  const coursesCard = document.querySelector(selector),
    timerContent = coursesCard.querySelector('.timer');

  function getTimeRemaining() {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;
    const seconds = Math.floor(timeRemaining % 60);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const hours = Math.floor((timeRemaining / 3600) % 24);
    const days = Math.floor(timeRemaining / 86400);
    return { timeRemaining, days, hours, minutes, seconds };
  }

  function timerNumber(n) {
    if (n <= 9) {
      return '0' + n;
    } else {
      return n;
    }
  }

  function checkDays(n) {
    if (n.toString().slice(-1) === '1' && n !== 11) {
      return 'день';
    } else if (n.toString().slice(-1) === '2' || n.toString().slice(-1) === '3' || n.toString().slice(-1) === '4') {
      if (n !== 12 && n !== 13 && n !== 14) {
        return 'дня';
      } else {
        return 'дней';
      }
    } else {
      return 'дней';
    }
  }

  function checkHours(n) {
    if (n.toString().slice(-1) === '1' && n !== 11) {
      return 'час';
    } else if (n.toString().slice(-1) === '2' || n.toString().slice(-1) === '3' || n.toString().slice(-1) === '4') {
      if (n !== 12 && n !== 13 && n !== 14) {
        return 'часа';
      } else {
        return 'часов';
      }
    } else {
      return 'часов';
    }
  }

  function checkMinutes(n) {
    if (n.toString().slice(-1) === '1' && n !== 11) {
      return 'минута';
    } else if (n.toString().slice(-1) === '2' || n.toString().slice(-1) === '3' || n.toString().slice(-1) === '4') {
      if (n !== 12 && n !== 13 && n !== 14) {
        return 'минуты';
      } else {
        return 'минут';
      }
    } else {
      return 'минут';
    }
  }

  function checkSeconds(n) {
    if (n.toString().slice(-1) === '1' && n !== 11) {
      return 'секунда';
    } else if (n.toString().slice(-1) === '2' || n.toString().slice(-1) === '3' || n.toString().slice(-1) === '4') {
      if (n !== 12 && n !== 13 && n !== 14) {
        return 'секунды';
      } else {
        return 'секунд';
      }
    } else {
      return 'секунд';
    }
  }

  const timerId = setInterval(() => {
    const timer = getTimeRemaining();

    if (timer.timeRemaining < 0) {
      clearInterval(timerId);
      return;
    }
    
    timerContent.textContent = `${timerNumber(timer.days)} ${checkDays(timer.days)} : 
                                ${timerNumber(timer.hours)} ${checkHours(timer.hours)} : 
                                ${timerNumber(timer.minutes)} ${checkMinutes(timer.minutes)} : 
                                ${timerNumber(timer.seconds)} ${checkSeconds(timer.seconds)}`;
  }, 1000);

}

countTimer('.courses-card-wait1', '17 october 2020 13:00:00');
countTimer('.courses-card-wait2', '7 november 2020');

// слайдер со статьями
var articlesSwiper = new Swiper('.articles-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: '.articles-next',
    prevEl: '.articles-prev'
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 75
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

// плавный скролл ссылок футера
const footer = document.querySelector('.footer');

function scrollLink(item) {
  const blockId = item.getAttribute('href').substr(1);

  document.getElementById(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

footer.addEventListener('click', event => {
  const target = event.target;
  
  if (target.classList.contains('footer-courses-link')) {
    event.preventDefault();
    scrollLink(target);
  }
});