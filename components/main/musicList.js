import {ScrollView, FlatList} from 'react-native'
import {useState, useEffect} from 'react'
import SongItem from "../common/songItem";


const MusicList = () => {

    
    const [media, setMedia] = useState([])

    const requestPermission = async ()=>{
        const a = MediaLibrary.requestPermissionsAsync()
    }


    const readFiles = async()=>{
        const audioAssets = await MediaLibrary.getAssetsAsync({mediaType: 'audio'})
        setMedia(audioAssets.assets)
    }

    useEffect(()=>{
        requestPermission()
        readFiles()
    }, [])


    const playSong = (song)=>{
        console.log(song)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <FlatList
                data={media}
                renderItem={({ item }) => (
                    <SongItem song={item} onPress={() => playSong(item)} />
                )}

                keyExtractor={item => item.id}
                // contentContainerStyle={{ columnGap: SIZES.small }}
                showsHorizontalScrollIndicator={false}
            >

            </FlatList>
        </ScrollView>
    )
}