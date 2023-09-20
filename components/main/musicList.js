import { ScrollView, FlatList, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import SongItem from "../common/songItem";
import * as MediaLibrary from 'expo-media-library';
import tw from 'twrnc'
import DText from '../common/customText';
import { Path, Svg } from 'react-native-svg';
import { FAB } from "react-native-paper";
import {Audio} from 'expo-av'


import {scheduleNotificationAsync } from 'expo-notifications';

const MusicList = () => {


    const [media, setMedia] = useState([])
    const [activeItem, setActiveItem] = useState(null)
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

        registerForPushNotificationsAsync().then((token) => {
            console.log('Notification token:', token);
        });

        requestPermission()
        readFiles()
    }, [])

    const scheduleNotification = async (title, body) => {
        await scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
          },
          trigger: {
            seconds: 0, // Notification will be shown after 5 seconds
          },
        });
      };


    const playSong = async (song) => {
        setActiveItem(song)
        scheduleNotification("Muzik Player", `Now playing: ${song.filename}`)
        if (playing) {
            if(song.uri == activeItem.uri){
                await sound.unloadAsync();
                setActiveItem(null)
                setPlaying(false)
                return
            }
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: song.uri },
            { shouldPlay: true }
        );
        setSound(newSound);
        setPlaying(true)
    }

    const stopPlaying = async () => {
        setPlaying(false)
        setActiveItem(null)
        await sound.stopAsync()
    }


    const handlePlayOrPause = () => {
        if (playing) {
            stopPlaying()
        } else {
            if (activeItem) {
                playSong(activeItem)
            } else {
                playSong(media[Math.floor(Math.random() * media.length)])
            }
        }
    }

    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

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
                        style={tw`pb-4`}
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
                onPress={handlePlayOrPause}
                icon={()=>(
                    <TouchableOpacity style={tw`mx-auto w-full h-full`}>
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



async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }




export default MusicList