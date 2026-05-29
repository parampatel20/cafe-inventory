const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
  try {
    const { categoryName, subCategories } = req.body;

    const results = [];
    for (let i = 0; i < subCategories.length; i++) {
      const sub = subCategories[i].trim();
      if (!sub) continue;

      const existing = await Category.findOne({ categoryName, subCategories: sub });
      if (!existing) {
        const cat = await Category.create({
          categoryName,
          subCategories: [sub],
          createdBy: req.user._id
        });
        results.push(cat);
      }
    }

    res.status(201).json(results[0] || { message: 'Already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('createdBy', 'name');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
