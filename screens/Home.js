import React, { useState } from 'react'
import {Text, View, ImageBackground} from 'react-native'
import {Button, Input} from 'react-native-elements'
import {styles} from '../styles/styles'

const imgBackground = require('../assets/home.jpg')

export default function Home(props) {

    const [name, setName] = useState("")

    return (
        <View style={styles.container}>
            <ImageBackground source={imgBackground} style={styles.imgBack}>
                <Input placeholder="Name"  value={name} onChangeText={(e) => setName(e)} containerStyle={styles.input}/>
                <Button title="to Gallery" onPress={() => props.navigation.navigate("GallerySnap")}/>
            </ImageBackground>
        </View>
        
    )
}