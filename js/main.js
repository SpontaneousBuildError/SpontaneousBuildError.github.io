// const aboutMeButton = document.querySelector('.header__button-about-me');
// const portfolioButton = document.querySelector('.header__button-portfolio');
// const pricingButton = document.querySelector('.header__button-pricing');
// const contactInfoButton = document.querySelector('.header__button-contact-info');

const aboutMe = document.querySelector('.about-me');
const portfolio = document.querySelector('.previous-work');

const previousWorkHeader = document.querySelector('.previous-work__header');
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const slideImages = document.querySelectorAll('.carousel__img');

const leftButton = document.querySelector('.carousel__button--left');
const rightButton = document.querySelector('.carousel__button--right');

const nav = document.querySelector('.carousel__nav');
let navWaypoints = [];

const slideWidth= slides[0].getBoundingClientRect().width;

var currentIndex = 0;
var targetIndex = 0;

var scrollTimer;

const leftButtonClick = leftButton.addEventListener('click', function () {
    slides.forEach((slide, index) => {
        slide.style.transitionDuration = '0.5s'
    });
    slideImages.forEach((img, index) => {
        img.style.transitionDuration = '0.5s'
    });
    setIndex(currentIndex - 1);
});

const rightButtonClick = rightButton.addEventListener('click', function () {
    slides.forEach((slide, index) => {
        slide.style.transitionDuration = '0.5s'
    });
    slideImages.forEach((img, index) => {
        img.style.transitionDuration = '0.5s'
    });
    setIndex(currentIndex + 1);
});

const onScreenResize = window.addEventListener('resize', function(event) {
    setIndex(currentIndex);
});

var waypointClicks = [];

function createWaypoints() {
    for (let i = 0; i < slides.length; i++) {
        const waypoint = document.createElement('button');
        waypoint.classList.add('carousel__waypoint');

        let size = Math.max(84 / slides.length, 12);

        waypoint.style.width = size + 'px';
        waypoint.style.height = size + 'px';
        
        waypoint.addEventListener('click', function () {
            slides.forEach((slide, index) => {
                slide.style.transitionDuration = '0s'
            });
            slideImages.forEach((img, index) => {
                img.style.transitionDuration = '0s'
            });
            setIndex(i);
        });
        
        nav.appendChild(waypoint);
    }
    if (slides.length > 5) {
        nav.style.width = '220px';
    }
    navWaypoints = Array.from(nav.children);
}

function setIndex(i) {
    if (i < 0) i = slides.length - 1;
    else if (i >= slides.length) i = 0;

    navWaypoints[currentIndex].classList.remove('current-slide');
    currentIndex = i;
    navWaypoints[currentIndex].classList.add('current-slide');

    slides.forEach((slide, index) => {
        let distance = Math.abs(index - i);
        let scale = 0;
        if (window.innerWidth <= 700) scale = 100;
        else if (distance == 0) scale = 100;
        else if (distance == 1) scale = 50;
        else scale = 25;

        if (window.innerWidth <= 700) {
            slide.style.left = slideWidth * (index - i) + 'px';
            slide.firstChild.style.width = '100%';
            slide.firstChild.style.height = '100%';
        }
        else {
            let displacement = index - i;
            if (displacement <= 1 && displacement >= -1) {
                if (displacement == 0) slide.style.zIndex = '2';

                slide.style.left = slideWidth * (index - i) + 'px';
            }
            else if (index === 0 && i === slides.length - 1) {
                slide.style.zIndex = '1';
                slide.style.left = slideWidth + 'px';
                scale = 50;
            }
            else if (index === slides.length - 1 && i === 0) {
                slide.style.zIndex = '0';
                slide.style.left = -slideWidth + 'px';
                scale = 50;
            }
            else {
                slide.style.zIndex = '0';
                slide.style.left = 0;
            }

            slide.firstChild.style.width = scale + '%';
            slide.firstChild.style.height = scale + '%';
        }
    });
}

createWaypoints();
setIndex(1);