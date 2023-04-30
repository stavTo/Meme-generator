'use stirct'

const KEY_MEMES = 'savedMemesDB'
const KEY_IMGS = 'imgDB'
const KEY_NEXTID = 'nextIdDB'

const getDefaultLine = () => ({
    txt: 'Enter text',
    size: 40,
    font: 'Arial',
    align: 'center',
    fillColor: '#ffffff',
    strokeColor: '#000000',
    pos: null,
    isDrag: false
})

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'child': 2, 'movie': 4, 'president': 10, 'dog': 8 }

let gNextImgId = 1

let gImgs
let gFilter = null

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    isReEdit: false,
    lines: [getDefaultLine()]
}

let savedMemes = []

init()

function init() {
    gImgs = loadFromStorage(KEY_IMGS)
    if (!gImgs || !gImgs.length) {
        gImgs = [
            { id: gNextImgId++, url: 'img/1.jpg', keywords: ['president', 'trump'] },
            { id: gNextImgId++, url: 'img/2.jpg', keywords: ['cute', 'dog', 'together'] },
            { id: gNextImgId++, url: 'img/3.jpg', keywords: ['dog', 'baby', 'sleep'] },
            { id: gNextImgId++, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
            { id: gNextImgId++, url: 'img/5.jpg', keywords: ['child', 'win'] },
            { id: gNextImgId++, url: 'img/6.jpg', keywords: ['explain', 'drunk'] },
            { id: gNextImgId++, url: 'img/7.jpg', keywords: ['baby', 'surprised'] },
            { id: gNextImgId++, url: 'img/8.jpg', keywords: ['magician', 'thinking'] },
            { id: gNextImgId++, url: 'img/9.jpg', keywords: ['child', 'laughing'] },
            { id: gNextImgId++, url: 'img/10.jpg', keywords: ['president', 'laughing'] },
            { id: gNextImgId++, url: 'img/11.jpg', keywords: ['sport', 'kissing'] },
            { id: gNextImgId++, url: 'img/12.jpg', keywords: ['pointed', 'serious'] },
            { id: gNextImgId++, url: 'img/13.jpg', keywords: ['cheers', 'drinks'] },
            { id: gNextImgId++, url: 'img/14.jpg', keywords: ['movie', 'cat'] },
            { id: gNextImgId++, url: 'img/15.jpg', keywords: ['exactly', 'movie'] },
            { id: gNextImgId++, url: 'img/16.jpg', keywords: ['funny', 'laughing'] },
            { id: gNextImgId++, url: 'img/17.jpg', keywords: ['president', 'cool'] },
            { id: gNextImgId++, url: 'img/18.jpg', keywords: ['funny', 'animation'] },
        ]
    }
}


function resetGMeme(imgId) {
    gMeme = {
        selectedImgId: +imgId,
        selectedLineIdx: 0,
        lines: [getDefaultLine()]
    }
}


function getMeme() {
    return gMeme
}

function getImgs() {
    if (!gFilter) {
        return gImgs
    } else {
        const imgs = gImgs.filter(img => img.keywords.includes(gFilter.toLowerCase()))
        gFilter = null
        return imgs
    }
}



function getSaveMemes() {
    savedMemes = loadFromStorage(KEY_MEMES)
    if (!savedMemes || !savedMemes.length) {
        savedMemes = []
    }

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
    return gImgs.find(currImg => currImg.id === gMeme.selectedImgId)
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLinePos(idx, pos) {
    gMeme.lines[idx].pos = pos
}

function saveMeme(imgUrl) {
    gMeme.imgUrl = imgUrl
    if (gMeme.isReEdit) {
        savedMemes.splice(gCurrMemeIdx, 1)
    }
    gMeme.isReEdit = true
    savedMemes.unshift({ ...gMeme })
    saveToStorage(KEY_MEMES, savedMemes)
}

function deleteSavedMeme(idx) {
    savedMemes.splice(idx, 1)
    saveToStorage(KEY_MEMES, savedMemes)

}

function setFilterBy(keywords) {
    gFilter = keywords
}

function updategMemeFromSaved(savedMemeIdx) {
    gMeme = savedMemes[savedMemeIdx]
}

function updategMemeFlexibleMode(randomMeme) {
    gMeme = randomMeme
}

// function changeKeywordCountMap(value) {
//     gKeywordSearchCountMap[value]++
// }

function addImg(img) {
    const customImg = {
        id: gNextImgId++,
        url: img.src,
        keywords: []
    }
    gImgs.unshift(customImg);
    saveToStorage(KEY_IMGS, gImgs)
    saveToStorage(KEY_NEXTID, gNextImgId)
    renderGallery()
}

function getImgById(id) {
    return gImgs.find(currImg => currImg.id == id)
}