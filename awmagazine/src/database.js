const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_URI = "mongodb+srv://admin:1234567890@awm.uh2y87l.mongodb.net/?retryWrites=true&w=majority&appName=AWM";
const DATABASE_NAME = "AWM";

const collection = db.collection("AWM");

  client.close();

connectToDB();
