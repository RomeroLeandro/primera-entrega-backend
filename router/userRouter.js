const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const uploadController = ('../controllers/uploadController.js')
const User = require('../dao/model/user-model'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/documents'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

userRouter.post('/upload-profile', uploadController.uploadProfileImage);
userRouter.post('/upload-image', uploadController.uploadProductImage);
userRouter.post('/upload-document', uploadController.uploadDocument);

userRouter.post('/:uid/documents', upload.array('documentFiles'), async (req, res) => {
    try {
      const userId = req.params.uid;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      if (req.files && req.files.length > 0) {
        user.documents = req.files.map((file) => ({
          name: file.originalname,
          reference: `/uploads/documents/${file.filename}`,
        }));
  
        await user.save();
      }
  
      res.status(200).json({ message: 'Archivos subidos exitosamente', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al subir los archivos' });
    }
  });
  

  userRouter.post('/premium/:uid', async (req, res) => {
    try {
      const userId = req.params.uid;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      if (
        user.documents.identification &&
        user.documents.addressProof &&
        user.documents.bankStatement
      ) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { role: 'premium' },
          { new: true }
        );
  
        return res
          .status(200)
          .json({ message: `Usuario ${userId} actualizado a premium` });
      } else {
        return res.status(400).json({
          error: 'El usuario no ha cargado todos los documentos requeridos',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar usuario a premium' });
    }
  });
  

module.exports = userRouter;
