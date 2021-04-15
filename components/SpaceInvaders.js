import { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import ComposedLogo from './invaders/ComposedLogo'
import Bullet from './invaders/Bullet'
const SpaceInvaders = () => {
    const shootInterval = useRef(false)
    const buttonX = useRef(false)
    const [windowSizes, setWindowSizes] = useState(false)
    const [tiles, setTiles] = useState(Array(48).fill({ destroyed: false }))
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
                String(buttonX.current)
            ]
        }) 
    }
    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window
        setWindowSizes({ width, height })
    }, [window])
    useEffect(() => {
        if(mustShoot) {
            createBullet()
            shootInterval.current = setInterval(() => createBullet(), 500)
        } else {
            clearInterval(shootInterval.current)
        }
    }, [mustShoot])
    return (
        <div className="space-invaders">
            {
                tiles && <ComposedLogo tiles={tiles} />
            }
            {
                bullets && bullets.map(buttonX => <Bullet initialPosition={buttonX} />)
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