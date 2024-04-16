const mongoose = require('mongoose');

const connectDB = async () => {
    const database = 'takafouliaDB';
    const port = '27017';  // le port MongoDB par défaut

    try {
        await mongoose.connect(`mongodb://127.0.0.1:${port}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: false
        });

        console.log("Database connected successfully");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
