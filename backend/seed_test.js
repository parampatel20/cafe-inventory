const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createTestUser() {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Hash passwords
    const adminHashed = await bcrypt.hash('kishan9779', 10);
    const staffHashed = await bcrypt.hash('test1234', 10);
    
    // Find old admin if it exists
    const oldAdmin = await User.findOne({ email: 'testadmin@cafe.com' });
    const oldAdminId = oldAdmin ? oldAdmin._id : null;
    
    // Delete the old testadmin if it exists
    await User.deleteOne({ email: 'testadmin@cafe.com' });
    
    // Create an admin
    const adminUser = await User.findOneAndUpdate(
        { email: 'kishan@gmail.com' },
        { name: 'Kishan Admin', password: adminHashed, role: 'admin', isActive: true },
        { upsert: true, new: true }
    );
    
    // Create a staff
    await User.findOneAndUpdate(
        { email: 'teststaff@cafe.com' },
        { name: 'Test Staff', password: staffHashed, role: 'staff', isActive: true },
        { upsert: true }
    );
    
    // Migrate old/orphan admin records to new admin
    const Inventory = require('./models/Inventory');
    const Bill = require('./models/Bill');
    const Category = require('./models/Category');
    
    if (oldAdminId) {
        await Inventory.updateMany({ addedBy: oldAdminId }, { addedBy: adminUser._id });
        await Inventory.updateMany({ updatedBy: oldAdminId }, { updatedBy: adminUser._id });
        await Bill.updateMany({ uploadedBy: oldAdminId }, { uploadedBy: adminUser._id });
        await Category.updateMany({ createdBy: oldAdminId }, { createdBy: adminUser._id });
    }
    
    // Also explicitly migrate the specific hardcoded orphan ID (6a0821114ee85fa1869c1c12)
    const targetOrphanId = new mongoose.Types.ObjectId('6a0821114ee85fa1869c1c12');
    await Inventory.updateMany({ addedBy: targetOrphanId }, { addedBy: adminUser._id });
    await Inventory.updateMany({ updatedBy: targetOrphanId }, { updatedBy: adminUser._id });
    await Bill.updateMany({ uploadedBy: targetOrphanId }, { uploadedBy: adminUser._id });
    await Category.updateMany({ createdBy: targetOrphanId }, { createdBy: adminUser._id });
    
    console.log('Test users created and database references migrated successfully!');
    process.exit();
}

createTestUser();
