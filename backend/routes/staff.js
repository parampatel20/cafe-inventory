const express = require('express');
const router = express.Router();
const {
  addStaff, getAllStaff,
  updateStaff, removeStaff, disableStaff
} = require('../controllers/staffController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/',              protect, adminOnly, getAllStaff);
router.post('/',             protect, adminOnly, addStaff);
router.put('/:id',           protect, adminOnly, updateStaff);
router.delete('/:id',        protect, adminOnly, removeStaff);
router.patch('/:id/disable', protect, adminOnly, disableStaff);

module.exports = router;