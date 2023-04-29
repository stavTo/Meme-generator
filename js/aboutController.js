'use strict'


function renderAbout() {
    let strHTML = `
    <div class="main-about">
    <img src="/img/mypic.jpeg">
    <h3>Stav Tohami </h3>
    <p>
    This meme-generator was programed by Stav Tohami
    </p>
    </div>
    `

    document.querySelector('.main').innerHTML = strHTML
}