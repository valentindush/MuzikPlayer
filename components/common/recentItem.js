import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import DText from "./customText"
import tw from 'twrnc'

const RecentItem = ({ image, artist, name }) => {
    console.log(image)
    return (
        <TouchableOpacity>
            <View style={tw`h-[10rem] w-[10rem]`}>
                {/* <Image source={image} style={tw`w-full z-0 h-full rounded-[1.125rem]`} resizeMode="cover"/> */}
                <View style={styles.container}>

                </View>
                <DText type={"semibold"} style={tw`absolute z-0 bottom-4 text-center w-full text-white text-lg`}>
                    {name ?? "Song Name"}
                </DText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Assuming this is applied to a View component
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.37) 0%, rgba(13, 4, 20, 0.87) 100%)',
        backgroundColor: 'lightgray',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
});

export default RecentItem