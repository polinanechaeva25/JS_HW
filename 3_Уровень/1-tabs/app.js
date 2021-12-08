'use strict';
const texts = {
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.',
    text3: 'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил.'
};

 let txt = document.querySelector('.text');
 let nlink = document.querySelectorAll('.nav-link');

nlink.forEach(el => el.addEventListener('click', clickHandler));


function clickHandler(event) {

    changeActiveClass(event);
    changeText(event);

}


function changeActiveClass(event) {
    for (var i = 0; i < nlink.length; i++) {
        nlink[i].classList.remove('active');
    }
    event.target.classList.add('active');
}


function changeText(event) {
    txt.innerText = texts[`text${event.target.textContent[event.target.textContent.length - 1]}`];
}