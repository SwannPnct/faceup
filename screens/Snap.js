import React,{useState, useEffect, useRef} from 'react'
import {Button, Text, View, TouchableOpacity} from 'react-native'
import {Overlay} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'
import {Camera} from 'expo-camera'

import { styles } from '../styles/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Snap(props) {

    const [hasPermissions, setHasPermissions] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState("on")
    const [isTakingPhoto, setIsTakingPhoto] = useState(false)
    const isFocused = useIsFocused()
    let camRef = useRef(null)

    useEffect(()=> {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermissions(status === "granted")
        })()
    },[])

    const handleTakePhoto = async () => {
        
            setIsTakingPhoto(true)
            if (camRef) {
                let photo = await camRef.takePictureAsync({
                    quality: 0.7
                })
                setIsTakingPhoto(false)
            }
    }

    if (!hasPermissions) {
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 10, color: "white", alignSelf: "center"}}>No access to camera.</Text>
            </View>
        )
    } else {
        return (
            <View style={{flex:1}}>
                {isFocused ? 
                    <Camera style={{flex:1}} type={type} flashMode={flash} ref={ref => (camRef = ref)}>
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
                            onPress={() => handleTakePhoto()}>
                            <MaterialIcons name="camera" size={50} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={() => {
                                if (flash === "on") {
                                    setFlash("auto")
                                } else if (flash === "auto") {
                                    setFlash("off")
                                } else {
                                    setFlash("on")
                                }
                            }}>
                            <MaterialIcons name={"flash-"+flash} size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Overlay isVisible={isTakingPhoto}>
                        <Text>Loading...</Text>
                    </Overlay>
                </Camera>
                : null} 
            </View>
        )
    }

    
}