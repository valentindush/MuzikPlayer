import { SafeAreaView, ScrollView, View, Text } from "react-native"
import { Stack, useRouter } from "expo-router"
import ScreenHeaderBtn from "../components/header/screenHeadeBtn"

import tw from 'twrnc'
import { COLORS, icons } from "../constants"
import RecentMedia from "../components/main/recentMedia"
import MusicList from "../components/main/musicList"

const Home = () => {

    const router = useRouter()

    const pressHandler = () => {
        console.log("pressHandler")
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.PRIMARY_COLOR},
                    headerShadowVisible: false,
                    headerTitle: "Muzik Player",

                    headerTitleStyle: {
                        color: COLORS.WHITE,
                        fontFamily: "JosefinRegular",
                        fontSize: 20
                    },

                    headerTitleAlign: 'center',


                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.LEFT_ICON} pressHandler={pressHandler} />
                    ),

                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.MORE_ICON} pressHandler={pressHandler} />
                    )
                }}
            />

          
            <RecentMedia /> 
            <MusicList />   

        </SafeAreaView>
    )
}

export default Home