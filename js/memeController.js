'use strict'

let gCanvas
let gCtx

function onInit() {

    renderGallery()


}

function renderEditor() {
    let strHTML = `
        <div class="edit-side">

        <div class="canvas-container">

        </div>

        <div class="container-text">

        </div>

        </div>

        <div class="control-box">
        <input type="text" placeholder="Enter a text..." value=""
        oninput="drawText(value)" />
        <button>Move line up</button>
        <button>Move line down</button>
        <button><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
        <button onclick="onAddTextLine()"><img src="icons/add.png"></button>
        <button><img src="icons/trash.png"></button>
        <button onclick="onChangeFontSize(2)"><img src="icons/increase font - icon.png"></button>
        <button onclick="onChangeFontSize(-2)"><img src="icons/decrease font - icon.png"></button>
        <button><img src="icons/align-to-left.png"></button>
        <button><img src="icons/center-text-alignment.png"></button>
        <button><img src="icons/align-to-right.png"></button>
        <button><img src="icons/text stroke.png"></button>
         <button><img src="icons/paint-board-and-brush.png"></button>
        <select class="font-family" name="font-family">
        <option value="font"> change fonts</option>
        <option value="arial">arial</option>
        <option value="tohama">tohama</option>
        </select>
        <button>download</button>
        <button>share</button>
        </div>
        `
    const elMain = document.querySelector('.main')
    elMain.innerHTML = strHTML
    renderMeme()
}

function renderMeme() {
    const currMeme = getMeme()
    let strHTML = `

    <canvas id="canvas" height="500" width="500"></canvas>

    `
    const elEditor = document.querySelector('.canvas-container')
    elEditor.innerHTML = strHTML
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    drawImgFromlocal(currMeme.selectedImgId)
}

function drawImgFromlocal(imgId) {
    const img = new Image()
    img.src = `img/${imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

// function onSetTextFirstLine(txt) {
//     // setLineTxt(txt)
//     // renderLineText()
//     // renderMeme()

//     drawImgFromlocal(imgId)
//     gCtx.fillStyle = "black";
//     gCtx.strokeStyle = "black";
//     gCtx.font = "35px Arial";
//     gCtx.fillText(txt, 100, 100);
//     gCtx.stroke();


// }

function drawText(text) {

    setLineTxt(text)
    const currMeme = getMeme()
    // drawImgFromlocal(currMeme.selectedImgId)
    const img = new Image()
    img.src = `img/${currMeme.selectedImgId}.jpg`
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${currMeme.lines[0].size}px Arial`
    // gCtx.textAlign = currMeme.lines[0].align
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 250, 50) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, 250, 50) // Draws (strokes) a given text at the given (x, y) position.
    gCtx.fillText(text, 250, 450) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, 250, 450) // Draws (strokes) a given text at the given (x, y) position.
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
}




