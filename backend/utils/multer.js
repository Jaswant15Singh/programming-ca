const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
module.exports = upload;
