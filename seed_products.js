const mongoose = require('mongoose');
const uri = "mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0";

const userId = "69f31b9e4127b3009b53ff0a";

const sampleProducts = [
    {
        name: "Premium California Almonds",
        price: 850,
        description: "High-quality, crunchy California almonds perfect for snacking or baking.",
        shortDescription: "Crunchy and nutritious California almonds.",
        stockQuantity: 100,
        category: "Almonds",
        mainImage: "https://m.media-amazon.com/images/I/71u+O9lW89L._SL1500_.jpg",
        images: [{ url: "https://m.media-amazon.com/images/I/71u+O9lW89L._SL1500_.jpg" }],
        variants: [
            { size: "500g", price: 850, discountPrice: 750 }
        ],
        user: userId
    },
    {
        name: "Roasted & Salted Pistachios",
        price: 950,
        description: "Perfectly roasted and lightly salted pistachios in shell.",
        shortDescription: "Savory roasted pistachios.",
        stockQuantity: 50,
        category: "Pistachios",
        mainImage: "https://m.media-amazon.com/images/I/71-Lw4O18zL._SL1500_.jpg",
        images: [{ url: "https://m.media-amazon.com/images/I/71-Lw4O18zL._SL1500_.jpg" }],
        variants: [
            { size: "500g", price: 950, discountPrice: 890 }
        ],
        user: userId
    },
    {
        name: "Whole Cashew Nuts",
        price: 1100,
        description: "Creamy, large whole cashew nuts, handpicked for quality.",
        shortDescription: "Creamy and rich whole cashews.",
        stockQuantity: 75,
        category: "Cashews",
        mainImage: "https://m.media-amazon.com/images/I/61r5f8a0-BL._SL1500_.jpg",
        images: [{ url: "https://m.media-amazon.com/images/I/61r5f8a0-BL._SL1500_.jpg" }],
        variants: [
            { size: "500g", price: 1100, discountPrice: 990 }
        ],
        user: userId
    },
    {
        name: "Premium Medjool Dates",
        price: 1500,
        description: "Large, soft, and sweet Medjool dates, the king of dates.",
        shortDescription: "Soft and sweet king of dates.",
        stockQuantity: 30,
        category: "Dates",
        mainImage: "https://m.media-amazon.com/images/I/71oX6u6W+kL._SL1500_.jpg",
        images: [{ url: "https://m.media-amazon.com/images/I/71oX6u6W+kL._SL1500_.jpg" }],
        variants: [
            { size: "1kg", price: 1500, discountPrice: 1350 }
        ],
        user: userId
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        
        // Clear existing products
        await mongoose.connection.db.collection('products').deleteMany({});
        console.log("Cleared existing products");
        
        // Add sample products
        const result = await mongoose.connection.db.collection('products').insertMany(sampleProducts);
        console.log(`Inserted ${result.insertedCount} products`);
        
    } catch (err) {
        console.error("Error seeding products:", err);
    } finally {
        await mongoose.disconnect();
    }
}

seedProducts();
