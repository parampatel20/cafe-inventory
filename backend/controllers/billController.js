const Bill = require('../models/Bill');

exports.uploadBill = async (req, res) => {
  try {
    const { billNumber, supplierName, billDate, totalAmount, category } = req.body;
    const billFile = req.file ? req.file.path : null;

    const bill = await Bill.create({
      billNumber,
      supplierName,
      billDate,
      totalAmount,
      category,
      billFile,
      uploadedBy: req.user._id
    });
    res.status(201).json(bill);
  } catch (err) {
    console.error('Bill upload error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const { category, supplier, startDate, endDate } = req.query;
    let query = {};

    if (category)  query.category     = category;
    if (supplier)  query.supplierName = { $regex: supplier, $options: 'i' };
    if (startDate || endDate) {
      query.billDate = {};
      if (startDate) query.billDate.$gte = new Date(startDate);
      if (endDate)   query.billDate.$lte = new Date(endDate);
    }

    const bills = await Bill.find(query).populate('uploadedBy', 'name');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
