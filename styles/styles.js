import {StyleSheet, Dimensions} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imgBack: {
        flex: 1,
        resizeMode: "cover",
        alignItems: 'center',
        justifyContent: 'center'
    },
    input : {
        width: "70%"
    },
    galleryContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    galleryTitle: {
        fontSize: 40,
        color: "black",
        fontWeight: "700",
        paddingTop: 50
    },
    cards: {
        width: "90%",
        marginTop: 20,
        padding: 0,
        backgroundColor: "white",
        justifyContent: 'center',
    },
    cardImg : {
        width: "100%"
    },
    cardText: {
        backgroundColor: "#00CA18",
        height: 20,
        margin: 2,
        padding: 2,
        color: "white",
    },
    textContainer: {
        padding: 20,
        alignItems : "center",
        justifyContent: "center"
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20
    },
    cameraButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        
    },
    videoContainer: {
        width: Dimensions.get('window').width,
        height: 400
      },
      video: {
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        height: 350
      }
  });