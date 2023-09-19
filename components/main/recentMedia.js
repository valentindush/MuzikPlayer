import { View, FlatList } from "react-native"
import tw from 'twrnc'
import colors from "../../constants/colors"
import DText from "../common/customText"
import RecentItem from "../common/recentItem"


const data = [
    {
        name: "Almost Healed",
        artist: "Lil Durk",
        image: require("../../assets/images/album.png")
    },
    {
        name: "Utopia",
        artist: "Travis Scott",
        image: require("../../assets/images/album.png")
    },
    {
        name: "222",
        artist: "Lil Tjay",
        image: require("../../assets/images/album.png")
    },
]

const RecentMedia = ()=>{

    return(
        <View style={tw`bg-[${colors.PRIMARY_COLOR}] pb-8 rounded-bl-[40px]`}>
            
            <View style={tw`px-6`}>
                <DText type={'bold'} style={tw`text-lg text-[${colors.WHITE}]`}>
                    Recent Media
                </DText>
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <RecentItem name={item.name} image={item.image} artist={item.artist} />
                )}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`mt-4 grid grid-cols-3 gap-3`}
                style={tw`px-6`}
            >

            </FlatList>

        </View>
    )
}

export default RecentMedia