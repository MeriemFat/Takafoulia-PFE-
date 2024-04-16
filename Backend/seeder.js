const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const User = require('../Backend/Shema/User.js');
const connectDB = require('../Backend/config/db.js');

dotenv.config()
connectDB()

// Insert sample data for users only
const importUserData = async () => {
    try {
        // First wipe database for users
        await User.deleteMany();

        // Migrate users
        await User.insertMany(users);

        console.log('User data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1); // Exit with failure
    }
};

// Delete/Wipe user sample data
const destroyUserData = async () => {
    try {
        // First wipe database for users
        await User.deleteMany();

        console.log('User data destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1); // Exit with failure
    }
};

// If node backend/seeder -d
// Then destroyUserData
// Else importUserData
if (process.argv[2] === '-d') {
    destroyUserData();
} else {
    importUserData();
}
