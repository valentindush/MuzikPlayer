import {Text} from 'react-native'

const DText = ({ children, style, type, ...props}) => {

    const _fontFamily = type === "bold" ? "JosefinBold" : type === "semibold" ? "JosefinSemibold" : type === "medium" ? "JosefinMedium" : "JosefinRegular"


    return (
        <Text style={{fontFamily: _fontFamily, ...style}} {...props}>
            {children}
        </Text>
    )
}

export default DText