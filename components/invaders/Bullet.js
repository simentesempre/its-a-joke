const Bullet = ({ bullet }) => {
    return (
        <div 
            id={ bullet.id } 
            className="bullet" 
            style={{ left: `${bullet.destroyed ? -9999 : bullet.initialPosition}px` }} 
        />
    )
}
export default Bullet