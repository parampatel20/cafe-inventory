const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
  try {
    const { categoryName, subCategories } = req.body;

    // Check if category already exists
    const existing = await Category.findOne({ categoryName });

    if (existing) {
      // Add new sub categories to existing ones without duplicates
      const newSubs = subCategories.filter(function(s) {
        return !existing.subCategories.includes(s);
      });
      existing.subCategories = existing.subCategories.concat(newSubs);
      await existing.save();
      return res.status(200).json(existing);
    }

    // Create new category
    const category = await Category.create({
      categoryName,
      subCategories,
      createdBy: req.user._id
    });
    res.status(201).json(category);
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
