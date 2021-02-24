import React, { useState,useRef } from 'react'
import {Text, View, ScrollView} from 'react-native'
import {Card,Overlay, Button} from 'react-native-elements'
import { Video, AVPlaybackStatus } from 'expo-av'
import {styles} from '../styles/styles'

import {connect} from 'react-redux'

function Gallery(props) {

    const [isVisible, setIsVisible] = useState(false)
    const [videoUrl, setVideoUrl] = useState(null)

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const toggleOverlay = (bool,url) => {
        if (bool) {
            setIsVisible(true)
            setVideoUrl(url)
        }
    }


    const generatePhotos = props.urls.map((e,i) => {
        const urlCut = e.slice(0, e.length - 4)
        const format = e.slice(e.length - 4, e.length)
        
        return (
        <Card containerStyle={styles.cards} key={i}>
                <Card.Image source={{uri: format=== ".mov" ? urlCut + '.jpg' : e}} style={styles.cardImg} onPress={() => toggleOverlay(format=== ".mov",e)}>
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
            <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} style={styles.videoContainer}>
                <Video
                    ref={video}
                    source={{
                    uri: videoUrl,
                    }}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.video}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
            <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
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