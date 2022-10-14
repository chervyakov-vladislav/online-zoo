
let carouselContainer = document.querySelector('.animals-carousel__container');
let carouselContainerList = document.querySelector('.animals-grid__list');
let carouselContainerItem = document.querySelector('.animals-grid__item');
let btnRight = document.querySelector('.animanls-carousel__controls--right');
let btnLeft = document.querySelector('.animanls-carousel__controls--left');
let animalsData = carouselContainer ? [...carouselContainerList.querySelectorAll('.animal-card')] : '';
let animalsColumnsCount = (document.body.offsetWidth > 768) ? 3 : 2;
let transitionDurationMs = carouselContainer ? parseInt(getComputedStyle(carouselContainerList).transitionDuration) * 1000 : '';
if (carouselContainer) {
  var removeIndex = (document.body.offsetWidth > 768) ? animalsData.length*3-1 : animalsData.length*2 + 1;
}

let computeStep = () => {
  let columnGap = parseInt(getComputedStyle(carouselContainerList).columnGap);
  let scrollStep = carouselContainerItem.offsetWidth + columnGap;
  return scrollStep;
}

let removeFromStart = () => {
  document.querySelector('.animals-grid__item').remove();
}

let removeFromEnd = () => {
  document.querySelectorAll('.animals-grid__item')[removeIndex].remove();
}

let createRandomElement = () => {
  const newCard = document.createElement('li');
  newCard.classList.add('animals-grid__item');
  newCard.innerHTML = animalsData[getRandomIndex()].outerHTML;
  return newCard;
}

let getRandomIndex = () => {
  return Math.round(Math.random() * (animalsData.length - 1));
}

let moveLeft = (scrollStep, currentPosotion) => {
  carouselContainerList.style.left = `${currentPosotion+scrollStep}px`;

  btnRight.style.pointerEvents = 'none';
  btnLeft.style.pointerEvents = 'none';

  setTimeout(() => {
    btnRight.style.pointerEvents = 'inherit';
    btnLeft.style.pointerEvents = 'inherit';

    let newCard;
    for (let i=0; i < animalsColumnsCount*2; i++) {
      newCard = createRandomElement();
      carouselContainerList.prepend(newCard);
    }

    for (let i=0; i < animalsColumnsCount*2; i++) {
      removeFromEnd();
    }

    carouselContainerList.style.transform = `translateX(${-currentPosotion-scrollStep*2}px)`;


  }, transitionDurationMs);
  

};

let moveRight = (scrollStep, currentPosotion) => {
  
  carouselContainerList.style.left = `${currentPosotion-scrollStep}px`;


  btnRight.style.pointerEvents = 'none';
  btnLeft.style.pointerEvents = 'none';

  setTimeout(() => {
    btnRight.style.pointerEvents = 'inherit';
    btnLeft.style.pointerEvents = 'inherit';

    let newCard;
    for (let i=0; i < animalsColumnsCount*2; i++) {
      newCard = createRandomElement();
      carouselContainerList.append(newCard);
    }

    for (let i=0; i < animalsColumnsCount*2; i++) {
      removeFromStart();
    }

    carouselContainerList.style.transform = `translateX(${-currentPosotion}px)`;

  }, transitionDurationMs)
  
};

if (carouselContainerList) {
  
  let scrollStep = computeStep()*animalsColumnsCount;
  let currentPosotion = -scrollStep;
  let newCard;
  
  for (let i=0; i < animalsColumnsCount*2; i++) {
    newCard = createRandomElement();
    carouselContainerList.prepend(newCard);
  }

  for (let i=0; i < animalsColumnsCount*2; i++) {
    newCard = createRandomElement();
    carouselContainerList.append(newCard);
  }

  carouselContainerList.style.left = `${currentPosotion}px`;


  btnRight.addEventListener('click', () => {
    moveRight(scrollStep, currentPosotion);
    currentPosotion -= scrollStep;
  }
    );
  btnLeft.addEventListener('click', () => {
    moveLeft(scrollStep, currentPosotion);
    currentPosotion += scrollStep;
  });
}