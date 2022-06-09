import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => console.info(`[DATABASE] Successfully connected to Mongo 🥳`))

db.on('error', () => {
  throw new Error(`❌ Unable to connect to database at ${process.env.MONGODB_URI} ❗️`);
});
