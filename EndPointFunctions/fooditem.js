const handlePut = (req, res, database) => {
  const { id, items } = req.body;

  database('users')
    .where({ id })
    .increment('entries', parseInt(items))
    .returning('entries')
    .then((entry) => {
      if (entry.length) {
        res.json(parseInt(entry[0]));
      } else {
        res.status(400).json('User Not Found');
      }
    })
    .catch((err) => {
      res.status(400).json('Ooops.. Error occured');
    });
};

module.exports = { handlePut };
