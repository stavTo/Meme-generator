'use stirct'

const KEY_MEMES = 'savedMemesDB'

const getDefaultLine = () => ({
    txt: 'Enter text',
    size: 40,
    font: 'arial',
    align: 'center',
    fillColor: '#ffffff',
    strokeColor: '#000000',
    pos: null,
    isDrag: false
})

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]
let savedMemes = []

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [getDefaultLine()]
}

function resetGMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [getDefaultLine()]
    }
}


function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getSaveMemes() {
    return savedMemes
}

function setImg(id) {
    gMeme.selectedImgId = +id
}

function addLine() {
    gMeme.lines.push(getDefaultLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.selectedLineIdx
    updateSelectedLine()
}

function setLineTxt(txt) {
    getCurrLine().txt = txt
}

function changeFontSize(diff) {
    getCurrLine().size += diff
}

function changeStrokeColor(color) {
    getCurrLine().strokeColor = color
}

function changeFillColor(color) {
    getCurrLine().fillColor = color
}

function changeAlign(align) {
    getCurrLine().align = align
}

function changeFontFamily(font) {
    getCurrLine().font = font
}

function setLineDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}


function updateSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setCurrLineByClick(idx) {
    gMeme.selectedLineIdx = idx
}


function moveLine(dx, dy) {
    getCurrLine().pos.x += dx
    getCurrLine().pos.y += dy
}

function getCurrImg() {
    return gImgs[gMeme.selectedImgId - 1]
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLinePos(idx, pos) {
    gMeme.lines[idx].pos = pos
}

function saveMeme() {
    savedMemes.push({ ...gMeme })
    saveToStorage(KEY_MEMES , savedMemes)
}