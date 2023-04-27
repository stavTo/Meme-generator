'use stirct'


function renderGallery() {
    const imgs = getImgs()
    let strHTML = `
    <section class="filter">

    <input type="text" data-trans="by-title" placeholder="Enter meme title" name="by-title" 
    oninput="onSetFilterByTitle(this)"/>

    <div class="popular-words">
    
    </div>
    </section>
    <div class="gallery-container">
    <div>
    <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" />
    <img src="icons/add.png"">
    </div>
    `
    strHTML += imgs.map(img => `
        <div>
        <img data-id="${img.id}" src="img/${img.id}.jpg" alt="" onclick="onImgSelect(this)">
        </div>
   ` )
    const elMain = document.querySelector('.main')
    elMain.innerHTML = strHTML + `</div>`
    elMain.classList.add('gallery')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    setImg(imgId)
    resetGMeme(imgId)
    renderEditor()
}

function onSetFilterByTitle(elInput) {
    const keywords = elInput.value
    setFilterBy(keywords)
    // renderGallery()

}