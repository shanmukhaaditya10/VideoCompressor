import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ImagePickerBox = ({ pickVideo, selectedVideo, initialVideoSize }) => {
  return (
    <View style={[styles.container,{ borderColor:selectedVideo?"#29FF00":"white"}]}>
      {selectedVideo ? (
        <View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text style={{ color: "white", fontSize: 20 }}>Selected Video Size:</Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            {initialVideoSize} mb
          </Text></View>
          <View  style={{justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity style={{width:130,justifyContent:"center",alignItems:"center",marginTop:20}} onPress={pickVideo}>
            <Text style={{fontSize:14,color:"#80ddff",fontWeight:"900",textDecorationLine:"underline"}}>Pick another?</Text>
          </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={pickVideo} style={styles.addBtn}>
          <Image
            source={require("../assets/AddVideoIcon.png")}
            style={{ margin: 20, width: 50, height: 50 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePickerBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "30%",
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "dotted",
    backgroundColor: "#474747",
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    backgroundColor: "#FFE500",
    borderRadius: 50,
  },
});
