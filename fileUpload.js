const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

app.post('/api/loan/upload', upload.single('document'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: req.file.filename });
});
