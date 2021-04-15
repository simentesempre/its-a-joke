import { useRef, useEffect } from 'react'
import useBoundingclientrect from '@rooks/use-boundingclientrect'

const Bullet = ({ initialPosition }) => {
    const bulletInterval = useRef(false)
    const bulletRef = useRef()
    const getBoundingClientRect = useBoundingclientrect(bulletRef)
    useEffect(() => {
        bulletInterval.current = setInterval(() => {
            console.log({ getBoundingClientRect })
        }, 50)
        return () => {
            clearInterval(bulletInterval.current)
        }
    }, [getBoundingClientRect])
    return (
        <div ref={bulletRef} className="bullet" style={{ left: `${initialPosition}px` }}></div>
    )
}
export default Bullet