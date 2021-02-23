import React,{useState, useEffect} from 'react'
import {Button, Text, View} from 'react-native'
import {Camera} from 'expo-camera'

export default function Snap(props) {

    const [hasPermissions, setHasPermissions] = useState()

    useEffect(()=> {
        (async () => {
            const {status} = await Camera.getPermissionsAsync()
            setHasPermissions(status === "granted")
        })()
    },[])

    return (
        <View style={{flex:1}}>
            <Button/>
        </View>
    )
}