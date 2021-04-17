const ComposedLogo = ({ tiles }) => {
    return (
        <div className={`composed-logo` }>
            {
                tiles.map(tile => <Tile key={tile.id} id={tile.id} destroyed={tile.destroyed}></Tile>)
            }
        </div>
    )
}
const Tile = ({ id, destroyed }) => <div id={id} className={`tile ${destroyed ? 'destroyed' : ''}`}></div>
export default ComposedLogo