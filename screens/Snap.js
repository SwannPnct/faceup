import React,{useState, useEffect, useRef} from 'react'
import {Button, Text, View, TouchableOpacity} from 'react-native'
import {Overlay} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'
import {Camera} from 'expo-camera'
import * as VideoThumbnails from 'expo-video-thumbnails'

import {connect} from 'react-redux'

import { styles } from '../styles/styles';
import { MaterialIcons } from '@expo/vector-icons';

function Snap(props) {

    const [hasPermissions, setHasPermissions] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState("on")

    const [isRecording, setIsRecording] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [uploadError, setUploadError] = useState(null)
    const isFocused = useIsFocused()
    let camRef = useRef(null)

    useEffect(()=> {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync()
            setHasPermissions(status === "granted")
        })()
    },[])

    const handleTakePhoto = async () => {
        
            setIsLoading(true)
            if (camRef) {
                let photo = await camRef.takePictureAsync({
                    quality: 0.7
                })
                const data = new FormData()
                data.append('photo', {
                    uri: photo.uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg'
                })
                const res = await fetch('http://192.168.1.54:3000/upload', {
                    method:"POST",
                    headers: {"Content-type":"application/form-data"},
                    body: data
                })
                const resJson = await res.json()
                if (!resJson.result) {
                    setUploadError(resJson.error)
                    setIsLoading(false)
                } else {
                    props.handleSave({url : resJson.response.secure_url, face: resJson.faceData})
                    setIsLoading(false)
                }
                
            }
    }

    const handleRecord = async () => {
        if (!camRef) return
        if (!isRecording) {
            setIsRecording(true)
            let video = await camRef.recordAsync({
                quality: Camera.Constants.VideoQuality['480p'],
                maxDuration: 30
            })

            setIsLoading(true)
            const data = new FormData()
            data.append('video', {
                uri: video.uri,
                type: 'video/mov',
                name: 'video.mov'
            })
            const res = await fetch('http://192.168.1.54:3000/upload-video', {
                method:"POST",
                headers: {"Content-type":"application/form-data"},
                body: data
            })
            
            const resJson = await res.json()
            if (!resJson.result) {
                setUploadError(resJson.error)
            } else {
                props.handleSave({url: resJson.response.secure_url, face : none})
            }
            setIsLoading(false)
        } else {
            setIsRecording(false)

            await camRef.stopRecording()

            
        }
    }

    const handleCloseError = () => {
        setUploadError(null)
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
                            onPress={handleTakePhoto}>
                            <MaterialIcons name="camera" size={50} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={handleRecord}>
                            <MaterialIcons name={!isRecording? "fiber-manual-record" : "stop"} size={50} color={!isRecording? "red" : "yellow"} />
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
                    <Overlay isVisible={isLoading}>
                        <Text>Loading...</Text>
                    </Overlay>
                    <Overlay isVisible={uploadError? true : false}>
                        <View>
                        <Text style={{color: "red", fontWeight: "700"}}>{uploadError}</Text>
                        <Button title="Ok" onPress={handleCloseError}/>
                        </View>
                    </Overlay>
                </Camera>
                : null} 
            </View>
        )
    }

    
}

function mapDispatchToPros(dispatch) {
    return {
        handleSave: (obj) => dispatch({
            type: "save", obj
        })
    }

    
}

export default connect(null, mapDispatchToPros)(Snap)