const accordeon = document.querySelector('.consultation-accordeon'),
  accordeonPanels = accordeon.querySelectorAll('.consultation-panel');

// скрипт аккордеона в секции Консультации
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

accordeon.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.consultation-panel__btn')) {
    togglePanel(target.closest('.consultation-panel__btn'));
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

