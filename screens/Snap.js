import React,{useState, useEffect} from 'react'
import {Button, Text, View, TouchableOpacity} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import {Camera} from 'expo-camera'

import { styles } from '../styles/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Snap(props) {

    const [hasPermissions, setHasPermissions] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flashEnabled, setFlashEnabled] = useState(false)
    const isFocused = useIsFocused()

    useEffect(()=> {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermissions(status === "granted")
        })()
    },[])

    if (!hasPermissions) {
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 10, color: "white", alignSelf: "center"}}>No access to camera.</Text>
            </View>
        )
    } else {
        return (
            <View style={{flex:1}}>
                 <Camera style={{flex:1}} type={type}>
                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={() => {
                                setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                                )
                            }}>
                            <MaterialIcons name="flip-camera-ios" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={() => {
                                setFlashEnabled(!flashEnabled)
                            }}>
                            <Ionicons name={flashEnabled? "flash" : "flash-off"} size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }

    
}