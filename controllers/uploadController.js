const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = '';
  
      if (file.fieldname === 'profileImage') {
        uploadPath = 'uploads/profiles/';
      } else if (file.fieldname === 'productImage') {
        uploadPath = 'uploads/products/';
      } else {
        uploadPath = 'uploads/documents/';
      }
  
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  function uploadProfileImage(req, res) {
    upload.single('profileImage')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error al subir la imagen de perfil' });
      } else if (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.send('Imagen de perfil subida correctamente');
    });
  }

  function uploadProductImage(req, res) {
    upload.single('productImage')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error al subir la imagen del producto' });
      } else if (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.send('Imagen de producto subida correctamente');
    });
  }

  function uploadDocument(req, res) {
    upload.single('document')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error al subir el documento' });
      } else if (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.send('Documento subido correctamente');
    });
  }

  module.exports = {
    uploadProfileImage,
    uploadProductImage,
    uploadDocument,
  };