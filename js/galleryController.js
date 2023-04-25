'use stirct'


function renderGallery() {
    const imgs = getImgs()
    let strHTML = imgs.map( img => `
        <div>
        <img data-id="${img.id}" src="img/${img.id}.jpg" alt="" onclick="onImgSelect(this)">
        </div>
   ` )

   const elMain = document.querySelector('.main')
   elMain.innerHTML = strHTML.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    setImg(imgId)
    renderEditor()
}