const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
const uplaodfile = require("../service/storage.service");
const songmodel = require("../Model/song.model");

router.post("/song", upload.single("audio"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const filedata = await uplaodfile(req.file);
  const song = await songmodel.create({
    title: req.body.title,
    artist: req.body.artist,
    audio: filedata.url,
    mood: req.body.mood,
  });

  res.status(201).json({
    message: "Created successfully",
    song: req.body,
    filedata: filedata,
  });
});

router.get("/song", async (req, res) => {
  const { mood } = req.query;
const songs = await songmodel.find({ mood: mood });

 res.status(200).json({
      message: "Songs fetched successfully",
      songs,
    });
});

module.exports = router;
