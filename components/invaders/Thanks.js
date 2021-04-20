import React from 'react'

const Thanks = React.memo(_ => {
    return (
        <div className="invaders thanks">
            <div>
                <p>
                    <img src="/images/Mask.png" alt={process.env.siteTitle} />
                </p>
                <p>
                    It's a joke.<br />
                </p>
                <p>
                    And you're cool.
                </p>
                <p>
                    Thanks for your visit.
                </p>
            </div>
        </div>
    )
})
export default Thanks