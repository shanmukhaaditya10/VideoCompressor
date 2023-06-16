import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CompressedDetails = ({compressedVideoSize,compressedVideo}) => {
    const handlePress = () => {
        const url = compressedVideo; 
        Linking.openURL(url);
      };
    
  return (
    <View style={styles.container}>
        
        <View style={{flexDirection: "row"}}>
      <Text style={{color: "white" ,fontSize: 17,fontWeight: "bold"}}>compressed Video size: </Text>
        <Text style={{color: "#29FF00",fontSize: 17,fontWeight: "bold"}}>{compressedVideoSize } mb</Text>
        </View>
     <TouchableOpacity  style={styles.openInBrowserBtn} onPress={handlePress}>
<Text style={{fontSize: 17,fontWeight: "bold"}}><Image source={require("../assets/browserIcon.png")}  style={{width: 20,height: 20}}/> <Text/>open</Text>
     </TouchableOpacity>
    </View>
  )
}

export default CompressedDetails

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: 100,
        marginTop:30,
        padding: 10,
        borderColor:"white",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#474747",
      },
      openInBrowserBtn:{
        marginTop: 10,
        backgroundColor: "#eff707",
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
      }
})