const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); //carpeta donde se guardarán las imagenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // obtiene la extensión original
    const shortName =
      path.basename(file.originalname, ext) + "-" + Date.now() + ext;
    cb(null, shortName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload; //exportar para usarlo en las rutas
