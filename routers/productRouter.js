// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

//******************rutas*****************

router.get('/offer', productsController.offert);

router.get('/featured', productsController.featured);  //---destacados
//---- creacion
router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);


router.get('/productsList', productsController.list);

router.get('/detail/:id/', productsController.detail);

//-------Modificacion
router.get('/edit/:id/', productsController.edit);
router.put('/update/:id', upload.single('image'), productsController.update);
//--------------
//------ lista de productos desabilitados-------------
router.get('/disabled/', productsController.disabled); // mer muestra los Id y noimbre de los productos desabilitados
//--------------------------------------------
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
