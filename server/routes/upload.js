const express = require("express");
var multer = require("multer");
const router = express.Router();
const Image = require("../models/image");

// Configure multer storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded!" });
  }

  try {
    let path = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    let newImage = new Image({ imageName: path });

    // Save the image document to the database
    await newImage.save();

    // Respond with the new image data in JSON format
    res.status(201).json({ success: true, image: newImage });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports.imageRouter = router;
