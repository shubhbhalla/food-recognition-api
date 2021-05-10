const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handlePost = (req, res) => {
  const { url } = req.body;
  app.models
    .predict(Clarifai.FOOD_MODEL, url)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json('Error in API call'));
};

module.exports = { handlePost };
