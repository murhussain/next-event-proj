import { MongoClient } from 'mongodb';

import { connectDatabase, insertDocument, getAllDocument } from '../../../helper/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  // database connection
  try{
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to database' });
    return;
  }

  //  this part is responsible for POST request
  if (req.method === 'POST') {

    const { email, name, text } = req.body;

    // add ServerSide validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      // close the connection to database
      client.close();
      return;
    }

    //  creating standard JS object
    const newComment = {
      email,
      name,
      text,
      eventId
    }

    let result;
    // prepare data to be stored
    try{
      result = await insertDocument(client, 'comments', newComment);

      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added Comment!', comment: newComment });

    } catch(error){
      res.status(500).json({ message: 'Inserting comment failed' });
    }
  }

  // this part is responsible for GET request
  if (req.method === 'GET') {
    try{
      const documents = await getAllDocument(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed' });
    }
  }

  // close the connection to database
  client.close();
}

export default handler;