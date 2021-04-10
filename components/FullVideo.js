const FullVideo = () => {
  return (
      <div className="video-wrapper">
          <video autoPlay muted playsInline loop id="itsajoke-video" poster="/video/splash/Frame_LogoAnimation.jpg">
              <source src="/video/splash/HP_sito.mp4" type="video/mp4" />
          </video>
      </div>
  )
}

export default FullVideo