const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


/* SHOW ALL PRODUCTS */

router.get('/' , productsController.products)



/* SHOW ALL CATEGORIES */

router.get('/categories' , productsController.categories)



/* SHOW PRODUCT DETAIL */

router.get('/:id' , productsController.productDetail)



/* EDIT ONE PRODUCT */

router.get('/:id/edit' , productsController.productEdit)
router.put('/:id' , productsController.productUpdate)



/* CREATE ONE PRODUCT */

router.get('/add' , productsController.productAdd)
router.post('/', productsController.productStore)


module.exports = router;