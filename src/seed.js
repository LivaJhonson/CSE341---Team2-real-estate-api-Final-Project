import fs from 'fs';
import path from 'path';
import connectDB from './config/db.js';
import User from './models/User.js';
import Property from './models/Property.js';

const __dirname = path.resolve(); // needed in ES modules

const seedData = async () => {
  try {
    await connectDB();

    // Read users.json
    const usersRaw = fs.readFileSync(path.join(__dirname, 'src', 'users.json'));
    const users = JSON.parse(usersRaw);

    // Read properties.json
    const propertiesRaw = fs.readFileSync(path.join(__dirname, 'src', 'properties.json'));
    const properties = JSON.parse(propertiesRaw);

    // Clear existing data (optional)
    await User.deleteMany({});
    await Property.deleteMany({});

    // Insert data
    await User.insertMany(users);
    await Property.insertMany(properties);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
