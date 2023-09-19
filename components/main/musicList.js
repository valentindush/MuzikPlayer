import { ScrollView, FlatList, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import SongItem from "../common/songItem";
import * as MediaLibrary from 'expo-media-library';
import tw from 'twrnc'
import DText from '../common/customText';
import { Path, Svg } from 'react-native-svg';
import { FAB } from "react-native-paper";
import {Audio} from 'expo-av'

const MusicList = () => {


    const [media, setMedia] = useState([])
    const [activeItem, setActiveItem] = useState()
    const [sound, setSound] = useState(null);
    const [playing ,setPlaying] = useState(false)


    const requestPermission = async () => {
        const a = await MediaLibrary.requestPermissionsAsync()
    }


    const readFiles = async () => {
        const audioAssets = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' })
        setMedia(audioAssets.assets)
    }

    useEffect(() => {
        requestPermission()
        readFiles()
    }, [])


    const playSong = async (song) => {

        if(playing && activeItem.filename === song.filename){
            console.log("same song")
            if(sound){
                await sound.stopAsync()
                await sound.unloadAsync()
                setPlaying(false)
                return
            }
        }

        if(playing && activeItem.filename !== song.filename){
    
            await sound.stopAsync()
            await sound.unloadAsync()
            setPlaying(false)
          
        }

        setActiveItem(song)
        const {sound} = await Audio.Sound.createAsync({uri: song.uri})
        setSound(sound)
        setPlaying(true)

        await sound.playAsync()

    }

    const stopPlaying = async () => {
        setPlaying(false)
        await sound.stopAsync()
    }


    const handlePlayOrPause = () => {

    }

    return (
        <SafeAreaView style={tw`h-[63%] px-2`}>
            <View style={{
                ...tw`px-4 h-full mt-4 shadow-md pt-6 bg-[#F1F1F1] rounded-xl`,
                elevation: 4,
            }}>
                <View style={tw`flex-row items-center justify-between`}>
                    <DText type={"bold"} style={tw`text-[#232222] text-xl`}>
                        Local Music
                    </DText>
                    <View style={tw`w-1/2`}>
                        <Svg style={tw`absolute left-4 top-3`} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M10.5417 18.2083C14.7758 18.2083 18.2083 14.7758 18.2083 10.5417C18.2083 6.30748 14.7758 2.875 10.5417 2.875C6.30748 2.875 2.875 6.30748 2.875 10.5417C2.875 14.7758 6.30748 18.2083 10.5417 18.2083Z" stroke="#4B4949" stroke-opacity="0.67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <Path d="M20.125 20.125L15.9562 15.9563" stroke="#4B4949" strokeOpacity="0.67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
                        <TextInput placeholder='Search' style={tw`border border-gray-400 h-12 px-4 pl-12 text-sm rounded-3xl w-full`} />
                    </View>
                </View>
                <ScrollView style={tw`h-full mt-2`} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={media}
                        renderItem={({ item }) => (
                            <SongItem song={item} active={activeItem?.filename == item.filename? true:false} pressHandler={playSong} />
                        )}

                        keyExtractor={item => item.id}
                        // contentContainerStyle={{ columnGap: SIZES.small }}
                        showsHorizontalScrollIndicator={false}
                    >

                    </FlatList>
                </ScrollView>
            </View>
            <FAB
                style={{
                    ...tw`absolute bottom-4 right-4 w-[4rem] h-[4rem] rounded-3xl bg-[#6E26A7]`,
                }}
                icon={()=>(
                    <TouchableOpacity style={tw`mx-auto w-full h-full`} onPress={handlePlayOrPause}>
                        {playing?
                        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M13.3333 5.33334H8V26.6667H13.3333V5.33334Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <Path d="M24 5.33334H18.6667V26.6667H24V5.33334Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>:
                        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M6.66666 4L25.3333 16L6.66666 28V4Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </Svg>
                        
                        }
                    </TouchableOpacity>
                )} 
            />
        </SafeAreaView>
    )
}

export default MusicList