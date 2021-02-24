import React, { useState } from 'react'
import {Text, View, ScrollView} from 'react-native'
import {Card,Overlay} from 'react-native-elements'
import { Video, AVPlaybackStatus } from 'expo-av'
import {styles} from '../styles/styles'

import {connect} from 'react-redux'

function Gallery(props) {

    const [isVisible, setIsVisible] = useState(false)
    const [videoUrl, setVideoUrl] = useState(null)

    const toggleOverlay = (bool,url) => {
        if (bool) {
            setIsVisible(true)
            setVideoUrl(url)
        }
    }


    const generatePhotos = props.urls.map((e,i) => {
        const urlCut = e.slice(0, e.length - 5)
        const format = e.slice(e.length - 5, e.length -1)

        return (
        <Card containerStyle={styles.cards} key={i}>
                <Card.Image source={{uri: format=== ".mp4" ? urlCut + '.jpg' : e}} style={styles.cardImg} onPress={() => toggleOverlay(format=== ".mp4",e)}>
                </Card.Image>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Homme</Text>
                    <Text style={styles.cardText}>70 ans</Text>
                    <Text style={styles.cardText}>Joyeux</Text>
                    <Text style={styles.cardText}>Cheveux gris</Text>
                </View>
            </Card>
    )})

    return (
        <ScrollView style={{flex:1}}>
            <View style={styles.galleryContainer}>
            <Text style={styles.galleryTitle}>Your Gallery</Text>
            {generatePhotos}
            </View>
            <Overlay isVisible={isVisible}>
                <Video
                    source={{
                    uri: videoUrl,
                    }}
                useNativeControls
                resizeMode="contain"
                isLooping
      />
            </Overlay>
        </ScrollView>
    )
}

function mapStateToProps(state) {
    return {
        urls : state.urls
    }
}

export default connect(mapStateToProps, null)(Gallery)