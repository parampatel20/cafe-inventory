const express   = require('express');
const router    = express.Router();
const DeleteLog = require('../models/DeleteLog');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const fiftyDaysAgo = new Date();
    fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - 50);

    const logs = await DeleteLog.find({
      deletedAt: { $gte: fiftyDaysAgo }
    })
      .populate('deletedBy', 'name')
      .sort({ deletedAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
