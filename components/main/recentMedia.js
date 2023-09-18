import { View } from "react-native"
import tw from 'twrnc'
import colors from "../../constants/colors"
import DText from "../common/customText"

const RecentMedia = ()=>{
    
    return(
        <View style={tw`bg-[${colors.PRIMARY_COLOR}] p-4 pb-24 rounded-bl-[55px]`}>
            <DText type={'bold'} style={tw`text-lg text-[${colors.WHITE}]`}>
                Recent Media
            </DText>

            
        </View>
    )
}

export default RecentMedia