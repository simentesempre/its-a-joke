import Draggable from 'react-draggable'

const DraggableButton = ({
    dragStartCallback,
    dragEndCallback,
    dragCallback,
    clickCallback,
    checkAllTilesDestroyed,
    windowSizes,
    mustShoot,
    buttonText
}) => {
    const buttonProps = {
        buttonText,
        mustShoot,
        checkAllTilesDestroyed,
        onClick: clickCallback
    }
    return (
        checkAllTilesDestroyed() ? 
            <TalkingButton { ...buttonProps } /> : 
            <Draggable 
                axis="x" 
                bounds="parent" 
                onStart={dragStartCallback}
                onStop={dragEndCallback}
                onDrag={dragCallback}
                defaultPosition={
                    {
                        x: (windowSizes.width / 2 ) -70, 
                        y: ( windowSizes.height / 100 ) * 80
                    }
                }
            >
                <TalkingButton { ...buttonProps } />
            </Draggable>
    )
}

const TalkingButton = ({ 
    buttonText, 
    mustShoot, 
    checkAllTilesDestroyed,
    ...rest
}) => {
    return (
        <button 
            id="destroyer" 
            className={`${mustShoot ? 'isShooting' : ''} ${checkAllTilesDestroyed() ? 'talk' : ''}`}
            {...rest}>
            {buttonText}
        </button> 
    )
}
export default DraggableButton