// index.js

// 1. Import Dependencies
const express = require('express');
const multer = require('multer');
const path = require('path');

// 2. Initialize Express App
const app = express();
const PORT = 3000;

// 3. Setup Multer for File Storage
// This configures multer to store uploaded files in the 'uploads/' directory
// and keep their original filenames.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    // Keep the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// 4. Configure Middleware
// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 5. Define Routes

// GET route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route to handle the file upload
// The `upload.single('myFile')` middleware processes the file.
// 'myFile' must match the 'name' attribute of your file input in the HTML form.
app.post('/upload', upload.single('myFile'), (req, res) => {
  // req.file is the `myFile` file
  // req.body will hold the text fields, if there were any

  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  console.log(`File uploaded successfully: ${req.file.path}`);

  // Send a success response
  res.json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path,
  });
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});