"use strict";
import "../post/post-data.pug";
import './card_of_post.scss';
import $ from "jquery";


$('.cards__item__see-more').click(function(){
    $(".hidd").fadeToggle(100);
    $(this).children().text( $(this).parent().is('.active') ? 'Читать полный отзыв' : 'Закрыть отзыв');
    $(this).parent().toggleClass('active');
});
