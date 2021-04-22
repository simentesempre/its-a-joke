import { useState, useEffect, useRef } from 'react'
import lottie from 'lottie-web'

import { createId, detectCollisions } from './helpers'

import ComposedLogo from './ComposedLogo'
import Bullet from './Bullet'
import WhatNow from './WhatNow'
import DraggableButton from './DraggableButton'

const JokeInvaders = () => {
    const shootInterval = useRef(false)
    const detectInterval = useRef(false)
    const buttonX = useRef(false)
    
    const [windowSizes, setWindowSizes] = useState(false)
    const [tiles, setTiles] = useState(Array.from({length: 48}, _ => ({ id: createId(), destroyed: false })))
    const [bullets, setBullets] = useState([])
    const [mustShoot, setMustShoot] = useState(false)
    const [buttonText, setButtonText] = useState('Don\'t click here!')
    const [tilesDestroyed, setTilesDestroyed] = useState(0)
    const [shake, setShake] = useState(false)
    const [soundLoaded, setSoundLoaded] = useState(false)
    const [soundEnded, setSoundEnded] = useState(true)

    const handleDragStart = _ => {
        setMustShoot(true)
    }

    const handleDragEnd = _ => {
        setMustShoot(false) 
    }

    const handleDrag = _ => {
        buttonX.current = getX()
    }

    const getX = _ => {     
        const destroyer = document.getElementById('destroyer')
        if(!destroyer) return false
        return destroyer.getBoundingClientRect().x + ( destroyer.clientWidth / 2 ) - 8
    }

    const createBullet = () => {
        if(!buttonX.current) {
            buttonX.current = windowSizes.width / 2
        }
        setBullets(prevBulletts => {
            return [
                ...prevBulletts,
                { id: createId(), destroyed: false, initialPosition: buttonX.current}
            ]
        }) 
    }

    const collisionCallback = (collidedTile, collidedBullet) => {
        shakeIt()
        setBullets(prevBulletts => {
            return prevBulletts.map( bullet => bullet.id === collidedBullet.id ? { ...bullet, destroyed: true } : bullet)
        })
        const canvasExplosion = document.createElement('div')
        canvasExplosion.setAttribute('style', `
            position: absolute; 
            width: 200px; 
            height: 200px; 
            top: ${collidedTile.boundingClientRect.y - 72.5}px; 
            left: ${collidedTile.boundingClientRect.x - 72.5}px;
        `)
        canvasExplosion.id = 'canvas-explosion'
        document.getElementById('joke-invaders').append(canvasExplosion)
        const explosion = lottie.loadAnimation({
            container: canvasExplosion,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '/json/explosion.json'
        })
        explosion.addEventListener('complete', () => {   
            canvasExplosion.parentNode.removeChild(canvasExplosion)
        })
        setTiles(prevTiles => {
            return prevTiles.map( tile => tile.id === collidedTile.id ? { ...tile, destroyed: true } : tile)
        })
    }

    const outsideCallback = (outsideBullet) => {
        setBullets(prevBulletts => {
            return prevBulletts.map( bullet => bullet.id === outsideBullet.id ? { ...bullet, destroyed: true } : bullet)
        })
    }

    const shakeIt = () => {
        setShake(true)
        setTimeout(() => {
            setShake(false)
        }, 375)
    }

    const checkAllTilesDestroyed = () => {
        return tiles.every( tile => tile.destroyed === true)
    }

    const checkHowManyTilesDestroyed = () => {
        return tiles.reduce( (acc, tile) => tile.destroyed ? acc + 1 : acc, 0)
    }

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window
        setWindowSizes({ width, height })
    }, [window])

    useEffect(() => {
        if(mustShoot) {
            createBullet()
            shootInterval.current = setInterval(() => createBullet(), 300)
            if(tilesDestroyed < 8) {
                setButtonText('I said don\'t click here!')
                buttonX.current = getX()
            }
        } else {
            clearInterval(shootInterval.current)
        }
    }, [mustShoot])

    useEffect(() => {
        return () => {
            clearInterval(shootInterval.current)
            clearInterval(detectInterval.current)
        }
    },[])

    useEffect(() => {
        if(detectInterval.current) clearInterval(detectInterval.current)
        if(tiles.length && bullets.length) {
            detectInterval.current = detectCollisions(tiles, bullets, collisionCallback, outsideCallback)
        }
        setTilesDestroyed(checkHowManyTilesDestroyed())
        if(checkAllTilesDestroyed()) setMustShoot(false)
    }, [tiles, bullets])

    useEffect(() => {
        if(tilesDestroyed >= 8) {
            setButtonText('You broke it!')
        }
        if(tilesDestroyed >= 15) {
            setButtonText('Please stop!')
        }
        if(tilesDestroyed >= 25) {
            setButtonText('I\'m begging you!')
        }
        if(tilesDestroyed >= 35) {
            setButtonText('NOOOOOO!!!')
        }
        if(checkAllTilesDestroyed()) {
            setButtonText('Let\'s talk')
        }
        buttonX.current = getX()
    }, [tilesDestroyed])

    return soundLoaded && (
        <div id="joke-invaders" className={`joke-invaders ${ shake ? 'shake' : ''}`}>
            { tiles && <ComposedLogo tiles={tiles} /> }
            { bullets && bullets.map(bullet => <Bullet key={bullet.id} bullet={bullet} />) }
            { checkAllTilesDestroyed() && <WhatNow /> }
            {
                windowSizes && !checkAllTilesDestroyed() && 
                <DraggableButton
                    dragStartCallback={handleDragStart}
                    dragEndCallback={handleDragEnd}
                    dragCallback={handleDrag}
                    windowSizes={windowSizes}
                    mustShoot={mustShoot}
                    buttonText={buttonText}
                /> 
            }
        </div>
    )
  }
  
  export default JokeInvaders