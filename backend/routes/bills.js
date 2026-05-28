const express = require('express');
const router  = express.Router();
const { uploadBill, getAllBills, deleteBill } = require('../controllers/billController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/',       protect, getAllBills);
router.post('/',      protect, upload.single('billFile'), uploadBill);
router.delete('/:id', protect, adminOnly, deleteBill);

module.exports = router;