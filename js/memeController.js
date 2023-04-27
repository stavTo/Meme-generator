'use strict'

let gCanvas
let gCtx
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {

    renderGallery()
}

function renderEditor() {
    let strHTML = `
        <div class="edit-side">

        <div class="canvas-container">
        <canvas id="canvas" height="500" width="500"></canvas>
        </div>

        <div class="container-text">

        </div>

        </div>

        <div class="control-box">
        <input class="text-input" type="text" placeholder="Enter a text..." value=""
        oninput="onChangeText(value)" />
        <button onclick="onChangeLine()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
        <button onclick="onAddTextLine()"><img src="icons/add.png"></button>
        <button onclick="onDeleteLine()"><img src="icons/trash.png"></button>
        <button onclick="onChangeFontSize(2)" ><img src="icons/increase font - icon.png"></button>
        <button onclick="onChangeFontSize(-2)" ><img src="icons/decrease font - icon.png"></button>
        <button name="end" onclick="onChangeAlign(name)"><img src="icons/align-to-left.png"></button>
        <button name="center" onclick="onChangeAlign(name)"><img src="icons/center-text-alignment.png"></button>
        <button name="start" onclick="onChangeAlign(name)"><img src="icons/align-to-right.png"></button>
        <button>
        <img src="icons/text stroke.png">
        <input class="stroke-color-input" type="color" value="#000000" oninput="onChangeStrokeColor(value)">
        </button>
         <button>
         <img src="icons/paint-board-and-brush.png">
         <input class="fill-color-input" type="color" value="#ffffff" oninput="onChangeFillColor(value)">
         </button>
        <select class="font-family-input" class="font-family" name="font-family" oninput="onChangeFontFamily(value)">
        <option value="font"> Impact</option>
        <option value="Arial">Arial</option>
        <option value="Tohama">Tohama</option>
        </select>
        <button><a href="#" class="btn" onclick="onDownloadImg(this)" download="my-img.jpg">Download as jpeg</a></button>
        <button>Share</button>
        <button onclick="onSaveMeme()" >Save</button>
        </div>
        `
    const elMain = document.querySelector('.main')
    elMain.innerHTML = strHTML
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderMeme()

}

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
//   }


function renderMeme() {
    const currImg = getCurrImg()
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        // resizeCanvas(img)
        renderBgImg(img)
        drawText()
        drawRect(getCurrLine())
        addListeners()
    }

}

function renderControlBox(line) {
    document.querySelector('input.text-input').value = line.txt
    document.querySelector('input.fill-color-input').value = line.fillColor
    document.querySelector('input.stroke-color-input').value = line.strokeColor
    document.querySelector('select.font-family-input').value = line.font
    renderMeme()
}


function drawText() {
    const lines = getMeme().lines
    lines.forEach((line, idx) => drawTextLine(line, idx))

}

function renderBgImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onChangeText(text) {
    setLineTxt(text)
    renderMeme()

}

function drawTextLine(line, idx) {
    if (!line.pos) {
        updateDefaultPos(idx)
    }
    const { strokeColor, fillColor, size, font, align, pos, txt } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
}

function onAddTextLine() {
    addLine()
    renderControlBox(getCurrLine())
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangeLine() {
    updateSelectedLine()
    renderControlBox(getCurrLine())
    renderMeme()
}

function onChangeStrokeColor(color) {
    changeStrokeColor(color)
    renderMeme()
}

function onChangeFillColor(color) {
    changeFillColor(color)
    renderMeme()
}

function onChangeAlign(align) {
    changeAlign(align)
    renderMeme()
}

function onChangeFontFamily(font) {
    changeFontFamily(font)
    renderMeme()

}

function drawRect(line) {
    gCtx.beginPath()
    gCtx.strokeStyle = '#00000099'
    gCtx.fillStyle = '#ffffff42'
    const { x, y, width, height } = calcTextBox(line)
    gCtx.rect(x, y, width, height)
    gCtx.fill()
    gCtx.stroke()
    gCtx.closePath()
}

function updateDefaultPos(idx) {
    if (idx === 0) {
        setLinePos(idx, { x: gCanvas.width / 2, y: 50 })
    } else if (idx === 1) {
        setLinePos(idx, { x: gCanvas.width / 2, y: gCanvas.height - 50 })
    } else {
        setLinePos(idx, { x: gCanvas.width / 2, y: gCanvas.height / 2 })
    }
}

function calcTextBox(line) {
    if (line.align === 'center') {
        return {
            x: line.pos.x - (gCtx.measureText(line.txt).width / 2) - 10,
            y: line.pos.y + 10,
            width: gCtx.measureText(line.txt).width + 20,
            height: -(line.size + 10)
        }
    } else if (line.align === 'start') {
        return {
            x: line.pos.x - 10,
            y: line.pos.y + 10,
            width: gCtx.measureText(line.txt).width + 20,
            height: -(line.size + 10)
        }
    } else {
        return {
            x: line.pos.x - gCtx.measureText(line.txt).width - 10,
            y: line.pos.y + 10,
            width: gCtx.measureText(line.txt).width + 20,
            height: -(line.size + 10)
        }
    }
}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    // Listen for resize ev
    window.addEventListener('resize', () => {
        onInit()
    })
}

function changeSelectedLineByClick() {
    if (isLineClicked()) {
        getMeme().selectedLineIdx
    }
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getCurrLine()
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function isLineClicked(clickedPos) {
    const selectedLineIdx = getMeme().lines.findIndex((line) => {
        const { x, y, width, height } = calcTextBox(line)
        return clickedPos.x > x && clickedPos.x < x + width && clickedPos.y < y && clickedPos.y > y + height
    })
    if (selectedLineIdx < 0) return
    setCurrLineByClick(selectedLineIdx)
    renderControlBox(getCurrLine())
    renderMeme()
    return true
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDownloadImg(elLink) {
    // need to remove the rect
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
 
function onSaveMeme() {
    saveMeme()
}


