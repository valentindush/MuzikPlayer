import { TouchableOpacity, Image } from "react-native"

const ScreenHeaderBtn = ({iconUrl, pressHandler}) => {
    return (
        <TouchableOpacity onPress={pressHandler}>
            <Image source={iconUrl} resizeMode='cover'/>
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn