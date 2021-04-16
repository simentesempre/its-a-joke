import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import lottie from 'lottie-web'

import { createId, detectCollisions } from './invaders/helpers'

import ComposedLogo from './invaders/ComposedLogo'
import Bullet from './invaders/Bullet'
import Thanks from './invaders/Thanks'

const SpaceInvaders = () => {
    const router = useRouter()

    const shootInterval = useRef(false)
    const detectInterval = useRef(false)
    const buttonX = useRef(false)

    const [windowSizes, setWindowSizes] = useState(false)
    const [tiles, setTiles] = useState(Array.from({length: 48}, _ => ({ id: createId(), destroyed: false })))
    const [bullets, setBullets] = useState([])
    const [mustShoot, setMustShoot] = useState(false)
    const [buttonText, setButtonText] = useState('Don\'t drag me!')
    const [tilesDestroyed, setTilesDestroyed] = useState(0)

    const handleDragStart = _ => {
        setMustShoot(true)
    }

    const handleDragEnd = _ => {
        setMustShoot(false) 
    }

    const handleDrag = _ => {
        buttonX.current = getX()
    }

    const handleClick = _ => {
        if(checkAllTilesDestroyed()){
            router.push('/invaders/contacts')
        }
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
        document.body.append(canvasExplosion)
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
                setButtonText('I said don\'t drag me!')
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
            detectInterval.current = detectCollisions(tiles, bullets, collisionCallback)
        }
        setTilesDestroyed(checkHowManyTilesDestroyed())
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
            setButtonText('NOOOOOOOOOOO!!!')
        }
        if(checkAllTilesDestroyed()) {
            setButtonText('Let\'s talk')
        }
        buttonX.current = getX()
    }, [tilesDestroyed])

    return (
        <div className="space-invaders">
            {
                tiles && <ComposedLogo tiles={tiles} />
            }
            {
                bullets && bullets.map(bullet => <Bullet key={bullet.id} bullet={bullet} />)
            }
            {
                checkAllTilesDestroyed() && <Thanks />
            }
            {
                windowSizes && 
                <Draggable 
                    axis="x" 
                    bounds="parent" 
                    onStart={handleDragStart}
                    onStop={handleDragEnd}
                    onDrag={handleDrag}
                    onMouseDown={handleClick}
                    defaultPosition={
                        {
                            x: (windowSizes.width / 2 ) - 50, 
                            y: ( windowSizes.height / 100 ) * 80
                        }
                    }
                >
                    <button id="destroyer" className={checkAllTilesDestroyed() ? 'talk' : ''}>{buttonText}</button>   
                </Draggable>
            }
        </div>
    )
  }
  
  export default SpaceInvaders