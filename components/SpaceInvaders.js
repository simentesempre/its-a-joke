import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
import { createId, detectCollisions } from './invaders/helpers'
import ComposedLogo from './invaders/ComposedLogo'
import Bullet from './invaders/Bullet'
const SpaceInvaders = () => {
    const router = useRouter()

    const shootInterval = useRef(false)
    const detectInterval = useRef(false)
    const buttonX = useRef(false)

    const [windowSizes, setWindowSizes] = useState(false)
    const [tiles, setTiles] = useState(Array.from({length: 48}, _ => ({ id: createId(), destroyed: false })))
    const [bullets, setBullets] = useState([])
    const [mustShoot, setMustShoot] = useState(false)

    const handleDragStart = (e, ui) => {
        setMustShoot(true)
    }

    const handleDragEnd = (e, ui) => {
        setMustShoot(false) 
    }

    const handleDrag = (e, ui) => {
        buttonX.current = getX(e)
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

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window
        setWindowSizes({ width, height })
    }, [window])
    useEffect(() => {
        if(mustShoot) {
            createBullet()
            shootInterval.current = setInterval(() => createBullet(), 350)
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
        if(checkAllTilesDestroyed()) router.push('/victory')
    }, [tiles, bullets])
    return (
        <div className="space-invaders">
            {
                tiles && <ComposedLogo tiles={tiles} />
            }
            {
                bullets && bullets.map(bullet => <Bullet bullet={bullet} />)
            }
            {
                windowSizes && 
                <Draggable 
                    axis="x" 
                    bounds="parent" 
                    onStart={handleDragStart}
                    onStop={handleDragEnd}
                    onDrag={handleDrag}
                    defaultPosition={
                        {
                            x: (windowSizes.width / 2 ) - 50, 
                            y: ( windowSizes.height / 100 ) * 80
                        }
                    }
                >
                    <button>Don't drag me</button>   
                </Draggable>
            }
        </div>
    )
  }
  
  export default SpaceInvaders