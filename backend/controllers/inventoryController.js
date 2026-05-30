const Inventory = require('../models/Inventory');
const DeleteLog = require('../models/DeleteLog');

exports.addItem = async (req, res) => {
  try {
    const { itemName, category, subCategory, quantity, unit, price, stockType } = req.body;

    if (!itemName || !category || !quantity || !unit || !price)
      return res.status(400).json({ message: 'Fill all required fields' });

    const item = await Inventory.create({
      itemName,
      category,
      subCategory:  subCategory || '',
      quantity:     Number(quantity),
      unit,
      price:        Number(price),
      stockType:    stockType || 'cafe',
      addedBy:      req.user ? req.user._id : null,
      updatedBy:    req.user ? req.user._id : null
    });

    res.status(201).json(item);
  } catch (err) {
    console.error('Add error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const { category, search, sort, stockType } = req.query;
    let query = {};
    if (category)  query.category  = category;
    if (stockType) query.stockType = stockType;
    if (search)    query.itemName  = { $regex: search, $options: 'i' };

    let items = Inventory.find(query).populate('addedBy updatedBy', 'name');
    if (sort === 'category') items = items.sort({ category: 1 });

    res.json(await items);
  } catch (err) {
    console.error('Get error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate('addedBy updatedBy', 'name');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Get single error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { itemName, category, subCategory, quantity, unit, price, stockType } = req.body;
    const isAdmin = req.user.role === 'admin';

    const existingItem = await Inventory.findById(req.params.id);
    if (!existingItem) return res.status(404).json({ message: 'Item not found' });

    const updateData = {
      updatedBy: req.user ? req.user._id : null
    };

    if (itemName)                  updateData.itemName    = itemName;
    if (category)                  updateData.category    = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;
    if (unit)                      updateData.unit        = unit;
    if (stockType)                 updateData.stockType   = stockType;
    if (price && isAdmin)          updateData.price       = Number(price);

    if (quantity !== undefined) {
      const newQty = Number(quantity);
      if (!isAdmin && newQty < existingItem.quantity) {
        return res.status(403).json({ message: 'Staff cannot decrease quantity' });
      }
      updateData.quantity = newQty;
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after' }
    );

    res.json(item);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updatePrice = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { price: Number(req.body.price), updatedBy: req.user._id },
      { returnDocument: 'after' }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Price error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await DeleteLog.create({
      itemName:  item.itemName,
      category:  item.category,
      quantity:  item.quantity,
      unit:      item.unit,
      price:     item.price,
      stockType: item.stockType,
      deletedBy: req.user ? req.user._id : null
    });

    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.transferItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const godownItem   = await Inventory.findById(req.params.id);

    if (!godownItem)
      return res.status(404).json({ message: 'Item not found' });
    if (godownItem.stockType !== 'godown')
      return res.status(400).json({ message: 'Item is not in godown' });
    if (godownItem.quantity < quantity)
      return res.status(400).json({ message: 'Not enough quantity in godown' });

    godownItem.quantity -= Number(quantity);
    godownItem.updatedBy = req.user ? req.user._id : null;
    await godownItem.save();

    let cafeItem = await Inventory.findOne({
      itemName:  godownItem.itemName,
      stockType: 'cafe'
    });

    if (cafeItem) {
      cafeItem.quantity += Number(quantity);
      cafeItem.updatedBy = req.user ? req.user._id : null;
      await cafeItem.save();
    } else {
      await Inventory.create({
        itemName:    godownItem.itemName,
        category:    godownItem.category,
        subCategory: godownItem.subCategory,
        quantity:    Number(quantity),
        unit:        godownItem.unit,
        price:       godownItem.price,
        stockType:   'cafe',
        addedBy:     req.user ? req.user._id : null,
        updatedBy:   req.user ? req.user._id : null
      });
    }

    res.json({ message: quantity + ' ' + godownItem.unit + ' transferred to café stock' });
  } catch (err) {
    console.error('Transfer error:', err.message);
    res.status(500).json({ message: err.message });
  }
};
