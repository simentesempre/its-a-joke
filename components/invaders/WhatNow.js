import { useState, useEffect } from 'react'

const WhatNow = _ => {
    const [timePassed, setTimePassed] = useState(false)
    
    useEffect(() => {
        if(!timePassed) {
            setTimeout(() => {
                setTimePassed(true)
            }, 1000)
        }
    }, [timePassed])
    
    return (
        <div className="invaders whatnow">
            <div className={timePassed ? 'show' : ''}>
                <p>
                    Thanks for destroying our site. Bravo!<br />
                </p>
                <p>
                    You're a bold one and you like to play, huh?
                </p>
                <p>
                    What are we going to do now?
                </p>
            </div>
        </div>
    )
}
export default WhatNow