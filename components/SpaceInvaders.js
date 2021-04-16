import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'

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

    const handleDragStart = (e, ui) => {
        setMustShoot(true)
    }

    const handleDragEnd = (e, ui) => {
        setMustShoot(false) 
    }

    const handleDrag = (e, ui) => {
        buttonX.current = getX(e)
    }

    const handleClick = _ => {
        if(checkAllTilesDestroyed()){
            router.push('/invaders/contacts')
        }
    }

    const getX = e => e.type === "touchmove" ? e.touches[0].screenX : e.x

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

    const collisionCallback = (tileId, bulletId) => {
        setBullets(prevBulletts => {
            return prevBulletts.map( bullet => bullet.id === bulletId ? { ...bullet, destroyed: true } : bullet)
        })
        setTiles(prevTiles => {
            return prevTiles.map( tile => tile.id === tileId ? { ...tile, destroyed: true } : tile)
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
                    <button className={checkAllTilesDestroyed() ? 'talk' : ''}>{buttonText}</button>   
                </Draggable>
            }
        </div>
    )
  }
  
  export default SpaceInvaders