export const detectCollisions = (tiles, bullets, collisionCallback) => {
    
    return setInterval(() => {
        const tilesWithBoundingClientRect = getElementsBoundingClientRect(tiles)
        const bulletsWithBoundingClientRect = getElementsBoundingClientRect(bullets)
        for (let t = 0; t < tilesWithBoundingClientRect.length; t++) {
            for (let b = 0; b < bulletsWithBoundingClientRect.length; b++) {
                if(!tilesWithBoundingClientRect[t].destroyed && !bulletsWithBoundingClientRect[b].destroyed) {
                    if(isCollide(tilesWithBoundingClientRect[t].boundingClientRect, bulletsWithBoundingClientRect[b].boundingClientRect)) {
                        collisionCallback(tilesWithBoundingClientRect[t].id, bulletsWithBoundingClientRect[b].id)
                    }
                }
            }
        }
    }, 100)
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