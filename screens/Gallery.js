import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import {styles} from '../styles/styles'

import {connect} from 'react-redux'

function Gallery(props) {

    const generatePhotos = props.photoUrls.map((e,i) => (
        <Card containerStyle={styles.cards} key={i}>
                <Card.Image source={{uri: e}} style={styles.cardImg}>
                </Card.Image>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Homme</Text>
                    <Text style={styles.cardText}>70 ans</Text>
                    <Text style={styles.cardText}>Joyeux</Text>
                    <Text style={styles.cardText}>Cheveux gris</Text>
                </View>
            </Card>
    ))

    return (
        <ScrollView style={{flex:1}}>
            <View style={styles.galleryContainer}>
            <Text style={styles.galleryTitle}>Your Gallery</Text>
            {generatePhotos}
            </View>
        </ScrollView>
    )
}

function mapStateToProps(state) {
    return {
        photoUrls : state.photoUrls
    }
}

export default connect(mapStateToProps, null)(Gallery)