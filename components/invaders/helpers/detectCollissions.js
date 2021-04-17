import memoize from 'memoizee'

export const detectCollisions = (tiles, bullets, collisionCallback, outsideCallback) => {
    
    return setInterval(() => {
        const tilesWithBoundingClientRect = getElementsBoundingClientRect(tiles)
        const bulletsWithBoundingClientRect = getElementsBoundingClientRect(bullets)
        for (let t = 0; t < tilesWithBoundingClientRect.length; t++) {
            for (let b = 0; b < bulletsWithBoundingClientRect.length; b++) {
                if(!tilesWithBoundingClientRect[t].destroyed && !bulletsWithBoundingClientRect[b].destroyed) {
                    if(memoizedIsCollide(tilesWithBoundingClientRect[t].boundingClientRect, bulletsWithBoundingClientRect[b].boundingClientRect)) {
                        collisionCallback(tilesWithBoundingClientRect[t], bulletsWithBoundingClientRect[b])
                    }
                    if(memoizedIsOutside(bulletsWithBoundingClientRect[b].boundingClientRect)) {
                        outsideCallback(bulletsWithBoundingClientRect[b])
                    }
                }
            }
        }
    }, 50)
}

const getElementsBoundingClientRect = (elements) => {
    const withDomElements = elements.map( el => ({ ...el, domElement: document.getElementById(el.id) }))
    return withDomElements.map( el => ({ ...el, boundingClientRect: el.domElement.getBoundingClientRect() }))
}

const isCollide = (a, b) => {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    )
}

const isOutside = (a) => {
    return a.y < 0
}

const memoizedIsCollide = memoize(isCollide)
const memoizedIsOutside = memoize(isOutside)