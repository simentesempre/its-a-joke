import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const WhatNow = _ => {
    const router = useRouter()
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
                <p>
                    <button onClick={() => router.push('/contacts')} className="talk">Ok, let's talk</button>
                </p>
            </div>
        </div>
    )
}
export default WhatNow