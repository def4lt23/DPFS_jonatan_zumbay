const multer = require("multer");
const path = require("path");

//manejar imagenes de productos
const storageProd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products")); //carpeta donde se guardarán las imagenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // obtiene la extensión original
    const shortName =
      path.basename(file.originalname, ext) + "-" + Date.now() + ext;
    cb(null, shortName);
  },
});

const upload = multer({ storage: storageProd });

//manejar imagenes de usuarios
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/users")); //carpeta donde se guardarán las imagenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // obtiene la extensión original
    const shortName =
      "avatar-" + Date.now() + ext;
    cb(null, shortName);
  },
});

const uploadUser = multer({ storage: storageUser });

module.exports = {
  upload,  // para productos
  uploadUser   // para usuarios
};
