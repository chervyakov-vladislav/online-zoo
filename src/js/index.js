// burger-menu
let body = document.querySelector('body');
let header = document.querySelector('header');
let menuButton = document.querySelector('.burger-button');
let maincontent = document.querySelector('.maincontent');


maincontent.addEventListener('click', event => {
  if (event.target == maincontent && menuButton.classList.contains('burger-button--toggled'))  {
    burgerMenuToggle();
  }

  if (event.target == maincontent && document.querySelector('.review-popup')) {
    closePopup();
  }
});

menuButton.addEventListener('click', () => burgerMenuToggle());


let burgerMenuToggle = () => {

  if (menuButton.classList.contains('burger-button--toggled')) {

    menuButton.classList.remove('burger-button--toggled');
    menuButton.classList.add('burger-button--unToggled');
    header.classList.remove('header--open');
    maincontent.classList.remove('overlay-bg');
    body.style.overflow = 'inherit';
    removeMenu();

  } else if (menuButton.classList.contains('burger-button--unToggled')) {

    menuButton.classList.remove('burger-button--unToggled');
    menuButton.classList.add('burger-button--toggled');
    header.classList.add('header--open');
    maincontent.classList.add('overlay-bg');
    body.style.overflow = 'hidden';
    header.append(createMenu());

  } else {
    menuButton.classList.add('burger-button--toggled');
    header.classList.add('header--open');
    maincontent.classList.add('overlay-bg');
    body.style.overflow = 'hidden';
    header.append(createMenu());
  }

}

let createMenu = () => {
  let currentMenu = document.querySelector('.header__buttons').cloneNode(true);
  let currentLink = document.querySelector('.header__links').cloneNode(true);
  const newMenu = document.createElement('div');
	newMenu.classList.add('mobile-menu');
  const newMenuContainer = document.createElement('div');
  
  newMenu.append(newMenuContainer);
  newMenuContainer.classList.add('mobile-menu__container');
  newMenuContainer.classList.add('container');
  newMenuContainer.append(currentMenu);
  newMenuContainer.append(currentLink);

  return newMenu;
}

let removeMenu = () => {
  let newMenu = document.querySelector('.mobile-menu');
  newMenu.remove();
}


//popup

const reviewCard = Array.from(document.querySelectorAll('.review-card'));

reviewCard.forEach(elem => elem.addEventListener('click', () => appendOverlay(elem)));

let appendOverlay = (elem) => {
  let reviewData = {
    srcPic: elem.querySelector('.user-info__pic').getAttribute('src'),
    userName: elem.querySelector('.user-info__name').innerText,
    userLocation: elem.querySelector('.user-info__location').innerText,
    userDate: elem.querySelector('.user-info__time').innerText,
    userText: elem.querySelector('.review-card__text').innerText,
  }
  let successOverlay = createOverlay(reviewData);
  maincontent.classList.add('overlay-bg');
  body.style.overflow = 'hidden';
  maincontent.append(successOverlay);
}

let createOverlay = (data) => {
  const newElement = document.createElement('div');
  newElement.classList.add('review-popup');
  const elementContainer = document.createElement('div');
  elementContainer.classList.add('review-popup__container');
  newElement.append(elementContainer);
  elementContainer.innerHTML = document.querySelector('.review-card').outerHTML;
  elementContainer.querySelector('.user-info__pic').setAttribute('src', data.srcPic);
  elementContainer.querySelector('.user-info__name').innerText = data.userName;
  elementContainer.querySelector('.user-info__location').innerText = data.userLocation;
  elementContainer.querySelector('.user-info__time').innerText = data.userDate;
  elementContainer.querySelector('.review-card__text').innerText = data.userText;
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('review-popup__close');
  closeBtn.innerHTML = '<div class="review-popup__close-btn"></div>';
  closeBtn.addEventListener('click', () => closePopup());
  elementContainer.prepend(closeBtn);
  return newElement;
}

const closePopup = () => {
  let popup = document.querySelector('.review-popup');
  popup.remove();
  if (maincontent.classList.contains('overlay-bg')) maincontent.classList.remove('overlay-bg');
  body.style.overflow = 'inherit';
}
