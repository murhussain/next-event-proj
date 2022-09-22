import { connectDatabase, insertDocument } from '../../helper/db-util';

async function handler(req, res) {
  if(req.method === 'POST'){
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    // connecting to the database
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed' })
      return;
    }
    

    // inserting data into db
    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      
      // to close connection to the server
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    // returning response after insert is done
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;