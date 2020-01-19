"use strict";
import "../post/post-data.pug";
import './card_of_post.scss';
import "../post/post.scss";
import $ from "jquery";

/*
$('.cards__item__see-more').click(function(){
    $(this).children().text( $(this).parent().is('.active') ? 'Читать полный отзыв' : 'Закрыть отзыв');
    $(this).parent().toggleClass('active');
    $(".post__item").toggleClass('_open');
});
*/
function reviewIsOpen(cardsElement) {
    const cardsItem = cardsElement.querySelector('.cards__item');
    return cardsItem.classList.contains('active');
}

function review(cardsElement, open) {
    const cardsItem = cardsElement.querySelector('.cards__item');
    const text = !open ? 'Читать полный отзыв' : 'Закрыть отзыв';
    cardsItem.querySelector('.cards__item__see-more__text-of-button').firstChild.textContent = text;
    cardsItem.classList.toggle('active', open);
    cardsItem.querySelector('.post__item').classList.toggle('_open', open);
    // TODO positioning
    const blockOfReview = cardsItem.querySelector('.post__item');
    const blockOfReviewStyle = blockOfReview.style;
    const viewportWidth = cardsElement.parentElement.offsetWidth;
    const cardsElementBCR = cardsElement.getBoundingClientRect();
    const postItemBCR = blockOfReview.getBoundingClientRect();

    const rightSpace = viewportWidth - cardsElementBCR.left;
    const placeAtRight = rightSpace < postItemBCR.width;
    if (placeAtRight) {
        const marginRight = window.getComputedStyle(cardsItem,null).getPropertyValue('margin-right');
        blockOfReviewStyle.left = (cardsElementBCR.left - (postItemBCR.width - cardsElementBCR.width)) - parseInt(marginRight, 10) + 'px';
    } else {
        blockOfReviewStyle.left = (cardsElementBCR.left) + 'px';
    }
    blockOfReview.classList.toggle('_triangleOnRight', placeAtRight)

    /*$0.getBoundingClientRect()
    $0.parentElement.getBoundingClientRect()
    $0.style.left = '-200px';
    */
}

function reviewClose(cardsElement) {
    review(cardsElement, false);
}

function reviewOpen(cardsElement) {
    review(cardsElement, true);
}

function reviewToggle(cardsElement) {
    review(cardsElement, !reviewIsOpen(cardsElement));
}

const buttons = document.querySelectorAll('.cards__item__see-more');

for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const currentCardsElement = this.parentElement.parentElement;
        const allCards = document.querySelectorAll('.cards__element');
        for(let cardElement of allCards) {
            if (cardElement !== currentCardsElement) {
                reviewClose(cardElement);
            }
        }
        reviewToggle(currentCardsElement);
    });
}

