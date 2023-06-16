import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ImagePickerBox from "./Components/imagePickerBox";
import CompressedDetails from "./Components/CompressedDetails";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState("");
  const [initialVideoSize, setInitialVideoSize] = useState("");
  const [compressedVideo, setCompressedVideo] = useState("");
  const [compressedVideoSize, setCompressedVideoSize] = useState("");
  const [compressing, setCompressing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library required!");
      }
    })();
  }, []);

  const uploadVideo = async () => {
    console.log("started");
    setCompressing(true);
    formData = new FormData();
    formData.append("video", {
      uri: selectedVideo.uri,
      type: "video/mp4",
      name: "video.mp4",
    });

    try {
      const response = await fetch(
        "https://videocompressorbackend.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCompressedVideo(data.compressedVideoUrl);
        setCompressedVideoSize(data.compressedVideoSize);
        console.log("Video upload success:", data);
        setCompressing(false);
        return response;
      } else {
        console.error("Video upload failed:", response.status);
      }
    } catch (error) {
      console.error("Video upload error:", error);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
      console.log(selectedVideo);

      const videoInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      const fileSize = videoInfo.size;
      const fileSizeMB = (fileSize / 1048576).toFixed(2);
      console.log("File size:", fileSizeMB, "MB");
      setInitialVideoSize(fileSizeMB);
    } else {
      Alert.alert("cancelled");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          fontStyle: "italic",
          textDecorationLine: "underline",
        }}
      >
        Video Compressor App
      </Text>
      <ImagePickerBox
        selectedVideo={selectedVideo}
        pickVideo={pickVideo}
        initialVideoSize={initialVideoSize}
      />
      {selectedVideo && (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={uploadVideo}
            style={styles.compressBtn}
            disabled={compressing}
          >
            
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              {compressing ? "compressing..." : "Start compressing"}
            </Text>
          </TouchableOpacity>
          {compressing && ( <Text style={{ color: "white" }}>please wait for a few seconds...</Text>)}
         
        </View>
      )}
      {compressedVideo && (
        <CompressedDetails
          compressedVideo={compressedVideo}
          compressedVideoSize={compressedVideoSize}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#242B2E",
  },
  compressBtn: {
    width: 200,
    height: 50,
    backgroundColor: "#29FF00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
