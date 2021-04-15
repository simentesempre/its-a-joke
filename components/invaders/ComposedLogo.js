const ComposedLogo = ({ tiles }) => {
    return (
        <div className="composed-logo">
            {
                tiles.map(tile => <Tile destroyed={tile.destryed}></Tile>)
            }
        </div>
    )
}
const Tile = ({ destroyed }) => <div className={`tile ${destroyed ? 'destroyed' : ''}`}></div>
export default ComposedLogo