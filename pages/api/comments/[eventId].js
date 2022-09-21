function handler(req, res) {
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
      return;
    }

    //  creating standard JS object
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }

    console.log(newComment);
    res.status(201).json({ message: 'Added Comment!', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Mur', text: 'A first comment' },
      { id: 'c2', name: 'Nomiso', text: 'A second comment' },
    ];
    res.status(200).json({comments: dummyList})
  }
}

export default handler;