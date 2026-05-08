const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0';

async function createNewUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const User = mongoose.connection.db.collection('users');
    
    const email = 'testuser@gmail.com';
    const password = 'test12345';
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists, updating password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne({ email }, { $set: { password: hashedPassword, role: 'user', name: 'Test User' } });
    } else {
      console.log('Creating new user...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.insertOne({
        name: 'Test User',
        email,
        password: hashedPassword,
        role: 'user',
        signupMethod: 'Email/Password',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log('User created/updated successfully!');
    console.log('Email:', email);
    console.log('Password:', password);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

createNewUser();
