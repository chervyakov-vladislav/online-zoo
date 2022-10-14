let reviewContainer = document.querySelector('.reviews-carousel__items');
let reviewCards = [...document.querySelectorAll('.reviews-carousel__item')];
let reviewInput = document.querySelector('.reviews-carousel__input');
let reviewCardsParams = document.querySelector('.review-card');
let currentReviewScrollValue;
let reviewScrollStep;

let computeReviewStep = (reviewGap) => {
  return (document.body.offsetWidth > 1300) ? reviewCardsParams.offsetWidth + reviewGap : reviewCardsParams.offsetWidth + reviewGap+10.5;
}

if (reviewContainer) {
  let cardsCount = reviewCards.length;
  let cardsInContanerCount = (document.body.offsetWidth > 1300) ? 4 : 3;
  let reviewGap = parseInt(getComputedStyle(reviewContainer).columnGap);
  reviewScrollStep = computeReviewStep(reviewGap);
  reviewInput.setAttribute( 'max' ,`${cardsCount-cardsInContanerCount}` );
  currentReviewScrollValue = reviewInput.getAttribute('value');

  reviewInput.addEventListener('input', () => {
    currentReviewScrollValue = reviewInput.value;
    reviewContainer.style.left = `${-currentReviewScrollValue*reviewScrollStep}px`
  })
}



