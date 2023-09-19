import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import DText from "./customText"
import tw from 'twrnc'

const RecentItem = ({ image, artist, name }) => {
    console.log(image)
    return (
        <TouchableOpacity>
            <View style={tw`h-[10rem] w-[10rem]`}>
                <Image source={image} style={tw`w-full z-0 h-full rounded-[1.125rem]`} resizeMode="cover"/>
                <View style={{
                    ...styles.container,
                    position: 'absolute',
                    zIndex: 10,
                    top: 0,
                    height: '100%',
                    width: '100%',
                    opacity: 0.5,
                    ...tw`rounded-[1.125rem]`
                    }}>

                </View>
                <DText type={"semibold"} style={tw`absolute z-10 bottom-8 text-center w-full text-white text-lg`}>
                    {name ?? "Song Name"}
                </DText>
                <DText type={"bold"} style={tw`absolute z-10 bottom-3 text-center w-full text-white`}>
                    {artist ?? "Song Name"}
                </DText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Assuming this is applied to a View component
        backgroundColor: 'black',
    },
});

export default RecentItem