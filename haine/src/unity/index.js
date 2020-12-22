import { UnityContent } from "react-unity-webgl"

console.log('paths', `./unity/Build/${process.env.REACT_APP_UNITY_JSON}`,`./unity/Build/${process.env.REACT_APP_UNITY_LOADER}`)

const unityContent  = new UnityContent(
    `./unity/Build/${process.env.REACT_APP_UNITY_JSON}`,
    `./unity/Build/${process.env.REACT_APP_UNITY_LOADER}`
)

export default unityContent