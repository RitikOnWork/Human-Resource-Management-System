const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedCandidate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = 'mike@gmail.com';
    const existing = await User.findOne({ email });

    if (existing) {
      console.log(`User ${email} already exists. Updating password...`);
      existing.password = 'candidate123';
      await existing.save();
    } else {
      await User.create({
        name: 'Mike Candidate',
        email,
        password: 'candidate123',
        role: 'candidate'
      });
      console.log(`User ${email} created successfully.`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCandidate();
