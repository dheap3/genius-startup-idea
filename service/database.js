const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("candyLand");
const userCollection = db.collection("users");
// const scoreCollection = db.collection("position");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function updatePlayerPosition(email, playerPosition) {
  await userCollection.updateOne({ email: email }, { $set: { playerPosition: playerPosition } });
}

function getPlayerPosition(email) {
  return userCollection.findOne({ email: email }, { projection: { playerPosition: 1, _id: 0 } });
}

async function getAllPlayerPositions() {
  const cursor = userCollection.find(
    { playerPosition: { $exists: true } },
    { projection: { email: 1, playerPosition: 1, _id: 0 } },
  );

  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  updatePlayerPosition,
  getPlayerPosition,
  getAllPlayerPositions,
};
