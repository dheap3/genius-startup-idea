const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db("candyLand");
const collection = db.collection("players");

async function main() {
  //checking if you can connect
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
  }

  try {
    // add database code here
    //add a document to the collection
    const player = {
      name: "Shack by the beach",
      summary: "seaweed in your toes",
      property_type: "Shack",
      beds: 300,
    };
    const insertResult = await collection.insertOne(house); //create (from CRUD)
    //
    //
    //query examples
    // collection.find();
    // collection.find({ beds: { $gte: 2 } }); //special operator for greater than or equal to
    // collection.find({ status: "open", beds: { $lt: 3 } }); //special operator for less than
    // collection.find({ $or: [{ beds: { $lt: 3 } }, { price: { $lt: 1000 } }] });//or operator
    // collection.find({ summary: /(modern|beach)/i }); //regex search for modern or beach, case insensitive
    // const query = { property_type: "Condo", beds: { $gte: 1 } };
    // const options = {
    //   sort: { score: -1 },
    //   limit: 10,
    // };
    // const cursor = collection.find(query, options);
    // const rentals = await cursor.toArray();
    // rentals.forEach((i) => console.log(i)); //read (from CRUD)
    //
    //
    // await collection.updateMany({ beds: { $gte: 1 } }, { $set: { beds: 2 } }); //update (from CRUD)
    // await collection.updateOne({ beds: { $gte: 1 } }, { $set: { beds: 3 } }); //update (from CRUD)
    //
    //
    // await collection.deleteOne({ beds: { $gte: 3 } }); //delete (from CRUD)
    // await collection.deleteMany({ beds: { $gte: 3 } }); //delete (from CRUD)
  } finally {
    client.close();
  }
}

main();
