import { TouchableOpacity, View } from "react-native"
import tw from 'twrnc'
import DText from "./customText"
import Svg, { Path } from 'react-native-svg';
import colors from "../../constants/colors";

const SongItem = ({song, pressHandler, active})=>{

    function secondsToTimeString(seconds) {
        const minutes = Math.floor(seconds / 60);
        const roundedSeconds = Math.round(seconds) % 60;
      
        // Use template literals to format the string with leading zeros if necessary
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = roundedSeconds < 10 ? `0${roundedSeconds}` : `${roundedSeconds}`;
      
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return(
        <View style={tw`p-4 flex-row items-center justify-between p-4 mt-2 bg-gray-100 rounded-xl border border-gray-300 `}>
            <View style={tw`flex-row items-center gap`}>
                <TouchableOpacity onPress={()=>pressHandler(song)}>
                    {!active?
                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/Svg">
                        <Path d="M2.91669 1.75L11.0834 7L2.91669 12.25V1.75Z" fill="#323030" stroke="#323030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>: 
                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.83333 2.33333H3.5V11.6667H5.83333V2.33333Z" stroke="#6E26A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <Path d="M11.1666 2.33333H8.83331V11.6667H11.1666V2.33333Z" fill="#D9D9D9" stroke="#6E26A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>}
                </TouchableOpacity>
                <DText type={'regular'} style={tw`${active?`text-[${colors.PRIMARY_COLOR}]`: "text-black"} w-[50%] ml-3`}>
                    {song.filename.length > 15 ? song.filename.substring(0, 15) + '...' : song.filename}
                </DText>

                <DText type={'regular'} style={tw`${active?`text-[${colors.PRIMARY_COLOR}]`: "text-black"}`}>
                    { song.artist? (song.artist.length > 10 ? song.artist.substring(0, 10) + '...' : song.artist): "Unknown Artist"}
                </DText>

            </View>
            <DText type={'regular'} style={tw`${active?`text-[${colors.PRIMARY_COLOR}]`: "text-black"}`}>
                {secondsToTimeString(song.duration)}
            </DText>
        </View>
    )
}

export default SongItem