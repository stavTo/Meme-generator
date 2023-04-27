'use strict'

function renderSaveMames() {
    let savedMemes = loadFromStorage(KEY_MEMES)
    if (!savedMemes) savedMemes = getSaveMemes()
    let strHTML = savedMemes.map(meme => 
        `
        <div>
        <img src="img/${meme.selectedImgId}.jpg" alt="" onclick="">
        </div>
   `)
    const elMain = document.querySelector('.main')
    elMain.innerHTML = strHTML.join('')
}