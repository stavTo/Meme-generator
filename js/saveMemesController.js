'use strict'

let gCurrMemeIdx = null

function renderSaveMames() {
    let savedMemes = getSaveMemes()
    let strHTML = savedMemes.map((meme, idx) =>
        `
        <article class="card">
        <img src="${meme.imgUrl}" alt="" onclick="">
        <div class="toolbar">
                <i data-idx="${idx}" onclick="onReEditSaveMeme(this)" class="icon fa-solid fa-pen-to-square"></i>
                <i data-idx="${idx}" onclick="onDeleteSaveMeme(this)" class="icon fa-solid fa-trash"></i>
                <a href="#" onclick="onDownloadImg(this)" download="my-img.jpg"><i data-idx="${idx}" class="icon fa-solid fa-download"></i></a>
            </div>
        </article>
   `).join('')
    if (!strHTML.length) {
        strHTML = `<h1> There are no saved memes yet <h1> `
    }
    const elMain = document.querySelector('.main')
    elMain.innerHTML = `<div class="saved-meme-container">` +
        strHTML + `</div>`
}

function onDeleteSaveMeme(elMeme) {
    flashMsg('meme deleted')
    const savedMemeIdx = elMeme.dataset.idx
    deleteSavedMeme(savedMemeIdx)
    renderSaveMames()
}
function onReEditSaveMeme(elMeme) {
    const savedMemeIdx = elMeme.dataset.idx
    updategMemeFromSaved(savedMemeIdx)
    gCurrMemeIdx = savedMemeIdx
    renderEditor()
}
