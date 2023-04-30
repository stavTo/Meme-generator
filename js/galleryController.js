'use stirct'

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.menu-button');
    elBtn.innerText = elBtn.innerText === '☰' ? 'X' : '☰';
}


function renderGallery() {
    const imgs = getImgs()
    let strHTML = `
    <section class="filter flex full">

    <div class="section-container flex space-between align-center">
    <input list="keyword" class="text-input" type="text" data-trans="by-title" placeholder="Enter meme title" name="by-title" 
    onchange="onSetFilterByTitle(value)"/>
    <datalist id="keyword">
    <option value="President">
    <option value="Cat">
    <option value="Child">
     <option value="Funny">
     <option value="Dog">
    </datalist>

    </div>
    <div class="popular-words flex">
    <ul class="clean-list flex">
    <li onclick="onChangeFontSizePopularWords(null)" value="All">All</li>
    <li onclick="onChangeFontSizePopularWords(this,'funny')" value="funny">Funny</li>
    <li onclick="onChangeFontSizePopularWords(this,'cat')" value="cat">Cat</li>
    <li onclick="onChangeFontSizePopularWords(this,'dog')" value="dogs">Dogs</li>
    <li onclick="onChangeFontSizePopularWords(this,'president')" value="president">President</li>
    <li onclick="onChangeFontSizePopularWords(this,'child')" value="childs">Childs</li>
    <li onclick="onChangeFontSizePopularWords(this,'movie')" value="movie">Movie</li>
    </ul>
    </div>
    <div class="container-gallery-btn flex">
    <button onclick="onFlexibleMode()" class="flexible-btn">Im Flexible </button>
    <input type="file" onchange="onAddCustomImg(event)">upload Image</button>
    <div>
    </section>
    <div class="gallery-container">

    `
    strHTML += imgs.map(img => `
        <article>
        <img data-id="${img.id}" src="${img.url}" alt="" onclick="onImgSelect(this)">
        </article>
   ` ).join('')
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

function onSetFilterByTitle(value) {
    const keywords = value
    setFilterBy(keywords)
    renderGallery()
}

function onFlexibleMode() {
    const randomMeme = getMeme()
    randomMeme.selectedImgId = getRandomInt(0, 17)
    randomMeme.lines[0].txt = gRandomTexts[getRandomInt(0,5)]
    randomMeme.lines[0].strokeColor = getRandomColor()
    randomMeme.lines[0].fillColor = getRandomColor()
    randomMeme.lines[0].size = getRandomInt(20, 70)

    updategMemeFlexibleMode(randomMeme)
    renderEditor()
}

function onChangeFontSizePopularWords(elWord , value) {
    onSetFilterByTitle(value)
    changeKeywordCountMap(value)
    
    // elWord.style.fontSize = gKeywordSearchCountMap[value]
    // renderGallery()
}

function onImgReady(img) {
    addImg(img)
    renderGallery()
}

function onAddCustomImg(ev) {
    loadImageFromInput(ev, onImgReady)
}

