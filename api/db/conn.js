require('dotenv').config();
const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_URI;
console.log(connectionString);  // Esto debería imprimir tu URI
const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToDatabase: async () => {
    try {
      await client.connect();
      dbConnection = client.db('musicHub');
      console.log("Successfully connected to database");
      const music = dbConnection.collection('music')
      const result = await music.findOne();
      console.log(result);
    } catch (e) {
      console.error(e);
      process.exit();
    }
  },

  getDb: function () {
    return dbConnection;
  }
};

