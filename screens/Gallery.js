import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import {styles} from '../styles/styles'

const img1 = require('../assets/picture-1.jpg')
const img2 = require('../assets/picture-2.jpg')
const img3 = require('../assets/picture-3.jpg')

export default function Gallery(props) {
    return (
        <ScrollView style={{flex:1}}>
            <View style={styles.galleryContainer}>
            <Text style={styles.galleryTitle}>Your Gallery</Text>
            <Card containerStyle={styles.cards}>
                <Card.Image source={img1} style={styles.cardImg}>
                </Card.Image>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Homme</Text>
                    <Text style={styles.cardText}>70 ans</Text>
                    <Text style={styles.cardText}>Joyeux</Text>
                    <Text style={styles.cardText}>Cheveux gris</Text>
                </View>
            </Card>
            <Card containerStyle={styles.cards} style={styles.cardImg}>
                <Card.Image source={img2}>
                </Card.Image>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Femme</Text>
                    <Text style={styles.cardText}>30 ans</Text>
                    <Text style={styles.cardText}>Festive</Text>
                    <Text style={styles.cardText}>Cheveux bouclés</Text>
                </View>
            </Card>
            <Card containerStyle={styles.cards} style={styles.cardImg}>
                <Card.Image source={img3}>
                </Card.Image>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Inerte</Text>
                    <Text style={styles.cardText}>99 ans</Text>
                    <Text style={styles.cardText}>Wow</Text>
                    <Text style={styles.cardText}>Cheveux crépus</Text>
                </View>
            </Card>
            </View>
        </ScrollView>
    )
}