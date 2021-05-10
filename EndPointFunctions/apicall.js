const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '0467e79b41c948c188b725123f9fcb6c',
});

const handlePost = (req, res) => {
  const { url } = req.body;
  app.models
    .predict(Clarifai.FOOD_MODEL, url)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json('Error in API call'));
};

module.exports = { handlePost };
