const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0';

async function testAuth() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const User = mongoose.connection.db.collection('users');
    const email = 'testuser@gmail.com';
    const password = 'test12345';

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
    } else {
      console.log('Testing password match for:', user.email);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Is password match?', isMatch);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

testAuth();
