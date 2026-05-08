const mongoose = require('mongoose');
const uri = "mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0";

async function listCollections() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

listCollections();
