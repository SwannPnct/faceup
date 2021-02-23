import React from 'react'
import {Text, View} from 'react-native'
import {Button} from 'react-native-elements'
import {styles} from '../App'

export default function Home(props) {
    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Button title="to Gallery" onPress={() => props.navigation.navigate("GallerySnap")}/>
        </View>
        
    )
}