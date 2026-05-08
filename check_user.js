const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://ranjima:ranjima@cluster0.i44oeuj.mongodb.net/ArabicNuts?appName=Cluster0';

async function checkUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const User = mongoose.connection.db.collection('users');
    const user = await User.findOne({ email: 'arabicadmin@gmail.com' });

    if (!user) {
      console.log('User not found');
    } else {
      console.log('User found:', user.email);
      console.log('Role:', user.role);
      console.log('Has password:', !!user.password);
      
      const testPassword = 'arabic123';
      if (user.password) {
        const isMatch = await bcrypt.compare(testPassword, user.password);
        console.log('Password match test (arabic123):', isMatch);
      }
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkUser();
