const express = require("express");
const app = express();

require("dotenv").config();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Video upload route
app.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const video = req.files.video;

    if (video.mimetype !== "video/mp4") {
      return res.status(400).json({ error: "Invalid video file format. Only MP4 videos are allowed" });
    }

    // Upload video to Cloudinary with compression
    const uploadResult = await cloudinary.uploader.upload(video.tempFilePath, {
      resource_type: "video",
      quality: 50,
    });

    // Retrieve the URL and size of the compressed video
    const compressedVideoUrl = uploadResult.secure_url;
    const compressedVideoSizeInBytes = uploadResult.bytes;

    // Calculate size in megabytes with 2 decimal places
    const compressedVideoSizeInMB = (compressedVideoSizeInBytes / (1024 * 1024)).toFixed(2);

    res.json({ compressedVideoUrl, compressedVideoSize: compressedVideoSizeInMB });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({ error: "Video upload error" });
  }
});
