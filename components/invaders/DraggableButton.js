import Draggable from 'react-draggable'

const DraggableButton = ({
    dragStartCallback,
    dragEndCallback,
    dragCallback,
    windowSizes,
    mustShoot,
    buttonText
}) => {
    const buttonProps = {
        buttonText
    }
    return (
        <Draggable 
            axis="x" 
            bounds="parent" 
            defaultClassNameDragging="isShooting"
            onStart={dragStartCallback}
            onStop={dragEndCallback}
            onDrag={dragCallback}
            defaultPosition={
                {
                    x: ( windowSizes.width / 2 ) - 84, 
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
    ...rest
}) => {
    return (
        <button 
            id="destroyer" 
            {...rest}>
            {buttonText}
        </button> 
    )
}
export default DraggableButton