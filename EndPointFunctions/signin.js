const handlePost = (req, res, bcrypt, database) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Incorrect Submission');
  }

  database('login')
    .where({ email: email.toLowerCase() })
    .select('hash')
    .then((hashedPassword) => {
      if (!hashedPassword.length) return es.status(400).json('No Such Email');

      const validPassword = bcrypt.compareSync(
        password,
        hashedPassword[0].hash
      );
      if (validPassword) {
        return database('users')
          .where({ email: email.toLowerCase() })
          .select('*')
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json('Unable to get user'));
      } else {
        res.status(400).json('Wrong Combination');
      }
    })
    .catch((err) => res.status(400).json('Error Occured'));
};

module.exports = { handlePost };
