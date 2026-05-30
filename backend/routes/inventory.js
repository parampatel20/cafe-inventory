const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/',              protect, controller.getAllItems);
router.post('/',             protect, controller.addItem);
router.get('/:id',           protect, controller.getSingleItem);
router.put('/:id',           protect, controller.updateItem);
router.patch('/:id/price',   protect, adminOnly, controller.updatePrice);
router.delete('/:id',        protect, controller.deleteItem);
router.post('/:id/transfer', protect, controller.transferItem);

module.exports = router;
