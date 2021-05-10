const handleGetId = (req, res, database) => {
  const { id } = req.params;

  database
    .select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not Found user');
      }
    });
};

module.exports = { handleGetId };
