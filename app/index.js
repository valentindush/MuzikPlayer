import { SafeAreaView, ScrollView, View, Text } from "react-native"
import { Stack, useRouter } from "expo-router"

const Home = () => {

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#fff"},
                    headerShadowVisible: false,
                    headerTitle: "Muzik Player",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1,}}>
                  <Text>Home</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home