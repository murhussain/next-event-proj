import { MongoClient } from 'mongodb';

// connecting to the database
export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://mur:event123@cluster0.ejlu5l4.mongodb.net/newsletter?retryWrites=true&w=majority'
  );

  return client;
}

// inserting to database
export async function insertDocument(client, collection, document){
  const db = client.db();

  // inserting data into db
  const result = await db.collection(collection).insertOne({ document });

  return result;
}

export async function getAllDocument(client, collection, sort){
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();
  
  return documents;
}