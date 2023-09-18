import { View } from "react-native"
import tw from 'twrnc'
import DText from "./customText"
const SongItem = ({song})=>{

    return(
        <View style={tw`p-4`}>
            <DText type={'regular'} style={tw`text-white`}>
                {song.filename}
            </DText>
        </View>
    )
}

export default SongItem