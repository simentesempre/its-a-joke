import React from 'react'
import {
    FacebookShareButton,
  } from "react-share"

const Over = ({ score, unityContent, setShowRestart}) => {
    const handleRestart = () => {
        unityContent.send(
          "Manager", 
          "LoadLevel", 
          1
        )
        setShowRestart(false)
    }
    return (
    <div className="over">
        <p>Hai resistito { score } secondi</p>
        <p><button onClick={handleRestart}>Gioca ancora</button></p>
        <FacebookShareButton url={window.location.href} quote={`Io ho resistito ${score} secondi. Riuscirai a battermi?`}>
            Condividi su Facebook
        </FacebookShareButton>
    </div>
    )
}

export default Over