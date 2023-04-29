'use strict'

const gRandomTexts = [
    'Hello',
    'Funny',
    'Interesting',
    'Wowwwwww',
    'Cool brooo',
    'So cute'
]




function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

