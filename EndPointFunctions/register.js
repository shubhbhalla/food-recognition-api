const handlePost = (req, res, bcrypt, database) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect Submission');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  database
    .transaction((transaction) => {
      return transaction('login')
        .insert({ hash: hashedPassword, email: email.toLowerCase() })
        .returning('email')
        .then((loginEmail) => {
          return transaction('users')
            .returning('*')
            .insert({
              name: name.toLowerCase(),
              email: loginEmail[0].toLowerCase(),
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(transaction.commit)
        .catch(transaction.rollback);
    })
    .catch((err) => res.status(400).json('Error occured'));
};

module.exports = { handlePost };
