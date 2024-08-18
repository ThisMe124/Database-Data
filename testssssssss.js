const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const port = 3000;

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk konversi WebP ke MP4
app.post('/convert/webp-to-mp4', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/${path.basename(req.file.originalname, path.extname(req.file.originalname))}.mp4`;

  ffmpeg(inputPath)
    .toFormat('mp4')
    .on('end', () => {
      fs.unlinkSync(inputPath); // Hapus file setelah konversi
      res.download(outputPath, () => {
        fs.unlinkSync(outputPath); // Hapus file setelah diunduh
      });
    })
    .on('error', (err) => {
      res.status(500).send('Error: ' + err.message);
    })
    .save(outputPath);
});

// Endpoint untuk konversi GIF ke MP4
app.post('/convert/gif-to-mp4', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/${path.basename(req.file.originalname, path.extname(req.file.originalname))}.mp4`;

  ffmpeg(inputPath)
    .toFormat('mp4')
    .on('end', () => {
      fs.unlinkSync(inputPath); // Hapus file setelah konversi
      res.download(outputPath, () => {
        fs.unlinkSync(outputPath); // Hapus file setelah diunduh
      });
    })
    .on('error', (err) => {
      res.status(500).send('Error: ' + err.message);
    })
    .save(outputPath);
});

// Pastikan direktori upload ada
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Mulai server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
