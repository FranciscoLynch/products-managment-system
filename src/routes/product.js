const router = require('express').Router();
const { view, viewAll, find, form, create, editProduct, updateProduct, remove} = require('../controllers/productController');

router.get('/', viewAll)
router.get('/view/:id', view)
router.post('/', find)

router.get('/add', form)
router.post('/add', create)

router.get('/edit/:id', editProduct)
router.post('/edit/:id', updateProduct)

router.get('/:id', remove)

module.exports = router;