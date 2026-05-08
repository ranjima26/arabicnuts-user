const mongoose = require('mongoose');
const uri = "mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0";

async function checkProducts() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        
        const products = await mongoose.connection.db.collection('products').find({}).toArray();
        console.log(`Found ${products.length} products`);
        if (products.length > 0) {
            console.log("First product:", JSON.stringify(products[0], null, 2));
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

checkProducts();
